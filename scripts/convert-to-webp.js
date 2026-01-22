const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const directories = ['public/orion', 'public/baverly']

// Convert all JPG/JPEG/PNG files in public root to WebP
function findAllImageFiles(dir) {
  const files = []
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
        files.push(path.join(dir, entry.name))
      }
    }
  } catch (e) {
    // Ignore errors
  }
  return files
}

async function convertToWebP() {
  // Process directories
  for (const dir of directories) {
    const fullPath = path.join(process.cwd(), dir)
    if (!fs.existsSync(fullPath)) {
      console.log(`Skipping ${dir} - directory not found`)
      continue
    }

    const files = fs.readdirSync(fullPath).filter((f) => 
      /\.(jpeg|jpg|png)$/i.test(f)
    )

    console.log(`\nProcessing ${files.length} files in ${dir}...`)

    for (const file of files) {
      const inputPath = path.join(fullPath, file)
      const outputPath = path.join(fullPath, file.replace(/\.(jpeg|jpg|png)$/i, '.webp'))
      
      try {
        await sharp(inputPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(outputPath)
        
        const inputStats = fs.statSync(inputPath)
        const outputStats = fs.statSync(outputPath)
        const saved = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1)
        
        console.log(`  ✓ ${file} → ${path.basename(outputPath)} (${saved}% smaller)`)
        
        // Delete original
        fs.unlinkSync(inputPath)
      } catch (err) {
        console.error(`  ✗ Error processing ${file}:`, err.message)
      }
    }
  }

  // Process root files in public directory
  console.log('\nProcessing root files in public...')
  const publicDir = path.join(process.cwd(), 'public')
  const rootFiles = findAllImageFiles(publicDir)
  
  for (const filePath of rootFiles) {
    const outputPath = filePath.replace(/\.(jpeg|jpg|png)$/i, '.webp')
    
    try {
      await sharp(filePath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath)
      
      const inputStats = fs.statSync(filePath)
      const outputStats = fs.statSync(outputPath)
      const saved = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1)
      
      console.log(`  ✓ ${path.basename(filePath)} → ${path.basename(outputPath)} (${saved}% smaller)`)
      
      // Delete original
      fs.unlinkSync(filePath)
    } catch (err) {
      console.error(`  ✗ Error processing ${path.basename(filePath)}:`, err.message)
    }
  }
  
  console.log('\n✓ Conversion complete!')
}

convertToWebP().catch(console.error)
