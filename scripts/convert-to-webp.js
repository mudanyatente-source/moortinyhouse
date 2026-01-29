const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const directories = ['public/orion', 'public/baverly']

// Convert all JPG/JPEG/PNG files recursively
function findAllImageFiles(dir) {
  const files = []
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
        files.push(fullPath)
      } else if (entry.isDirectory()) {
        // Recursively search subdirectories
        files.push(...findAllImageFiles(fullPath))
      }
    }
  } catch (e) {
    // Ignore errors
  }
  return files
}

async function convertToWebP() {
  // Process directories recursively
  for (const dir of directories) {
    const fullPath = path.join(process.cwd(), dir)
    if (!fs.existsSync(fullPath)) {
      console.log(`Skipping ${dir} - directory not found`)
      continue
    }

    const files = findAllImageFiles(fullPath)
    console.log(`\nProcessing ${files.length} files in ${dir} (including subfolders)...`)

    for (const filePath of files) {
      const outputPath = filePath.replace(/\.(jpeg|jpg|png)$/i, '.webp')
      
      try {
        await sharp(filePath)
          .webp({ quality: 85, effort: 6 })
          .toFile(outputPath)
        
        const inputStats = fs.statSync(filePath)
        const outputStats = fs.statSync(outputPath)
        const saved = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1)
        
        const relativePath = path.relative(fullPath, filePath)
        const relativeOutput = path.relative(fullPath, outputPath)
        console.log(`  ✓ ${relativePath} → ${relativeOutput} (${saved}% smaller)`)
        
        // Delete original
        fs.unlinkSync(filePath)
      } catch (err) {
        const relativePath = path.relative(fullPath, filePath)
        console.error(`  ✗ Error processing ${relativePath}:`, err.message)
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
