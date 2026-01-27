const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

async function optimizeHeroImage() {
  const inputPath = path.join(process.cwd(), 'public', 'beautiful-modern-tiny-house-in-nature-forest-setti.webp')
  const outputPath = path.join(process.cwd(), 'public', 'beautiful-modern-tiny-house-in-nature-forest-setti.webp')

  if (!fs.existsSync(inputPath)) {
    console.error('Hero image not found:', inputPath)
    return
  }

  try {
    // Get original image info
    const metadata = await sharp(inputPath).metadata()
    console.log('Original image:', {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: (fs.statSync(inputPath).size / 1024 / 1024).toFixed(2) + ' MB'
    })

    // Optimize with maximum quality while keeping file size reasonable
    // Quality 95-100 for hero images, effort 6 for best compression
    await sharp(inputPath)
      .webp({ 
        quality: 100,
        effort: 6,
        nearLossless: false,
        smartSubsample: true
      })
      .toFile(outputPath + '.optimized')

    const originalSize = fs.statSync(inputPath).size
    const optimizedSize = fs.statSync(outputPath + '.optimized').size
    const saved = ((1 - optimizedSize / originalSize) * 100).toFixed(1)

    console.log('\nOptimization complete!')
    console.log('Original:', (originalSize / 1024 / 1024).toFixed(2), 'MB')
    console.log('Optimized:', (optimizedSize / 1024 / 1024).toFixed(2), 'MB')
    console.log('Saved:', saved + '%')

    // Replace original with optimized (with retry logic for Windows file locks)
    let retries = 3
    while (retries > 0) {
      try {
        if (fs.existsSync(inputPath)) {
          fs.unlinkSync(inputPath)
        }
        fs.renameSync(outputPath + '.optimized', outputPath)
        console.log('\n✓ Hero image optimized successfully!')
        break
      } catch (err) {
        retries--
        if (retries === 0) {
          console.log('\n⚠ Could not replace original file (it may be in use).')
          console.log('Optimized file saved as:', outputPath + '.optimized')
          console.log('Please manually replace the original file.')
        } else {
          console.log('Retrying... (' + retries + ' attempts left)')
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }
    }
  } catch (err) {
    console.error('Error optimizing hero image:', err.message)
  }
}

optimizeHeroImage().catch(console.error)
