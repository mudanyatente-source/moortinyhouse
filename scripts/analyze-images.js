const fs = require('fs');
const path = require('path');

// Orion fotoğraflarını listele
console.log('=== ORION MODEL FOTOĞRAFLARI ===');
const orionDir = path.join(process.cwd(), 'public', 'orion');
if (fs.existsSync(orionDir)) {
  const orionFiles = fs.readdirSync(orionDir)
    .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f))
    .sort();
  
  orionFiles.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });
}

console.log('\n=== BEVERLY MODEL FOTOĞRAFLARI ===');
const beverlyDir = path.join(process.cwd(), 'public', 'baverly');
if (fs.existsSync(beverlyDir)) {
  // Check for subfolder structure
  const items = fs.readdirSync(beverlyDir);
  const hasSubfolders = items.some(item => {
    try {
      const itemPath = path.join(beverlyDir, item);
      return fs.statSync(itemPath).isDirectory();
    } catch {
      return false;
    }
  });
  
  if (hasSubfolders) {
    // List images from subfolders
    items.forEach(item => {
      try {
        const itemPath = path.join(beverlyDir, item);
        if (fs.statSync(itemPath).isDirectory()) {
          console.log(`\n--- ${item.toUpperCase()} ---`);
          const subFiles = fs.readdirSync(itemPath)
            .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f))
            .sort();
          
          subFiles.forEach((file, index) => {
            console.log(`${index + 1}. ${item}/${file}`);
          });
        }
      } catch {
        // Skip if can't read subfolder
      }
    });
  } else {
    // Original flat structure
    const beverlyFiles = items
      .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f))
      .sort();
    
    beverlyFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });
  }
}