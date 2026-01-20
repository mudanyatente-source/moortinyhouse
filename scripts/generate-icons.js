const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

async function main() {
  const publicDir = path.join(process.cwd(), 'public')
  const srcSvg = path.join(publicDir, 'favicon.svg')
  const srcPng = path.join(publicDir, 'favicon.png')

  const input = fs.existsSync(srcSvg) ? srcSvg : srcPng
  if (!fs.existsSync(input)) {
    console.error('No favicon source found (favicon.svg or favicon.png).')
    process.exit(1)
  }

  const outputs = [
    { name: 'favicon.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ]

  for (const o of outputs) {
    const outPath = path.join(publicDir, o.name)
    await sharp(input)
      .resize(o.size, o.size, { fit: 'cover' })
      // keep full color (no palette) so gradients/icons look crisp
      .png({ compressionLevel: 9 })
      .toFile(outPath)
    console.log('✓ generated', o.name)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

