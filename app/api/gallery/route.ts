import { NextResponse } from 'next/server'
import { readdirSync } from 'fs'
import path from 'path'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
const SKIP_DIRS = ['node_modules', '.git']

function* walkDir(dir: string, base: string): Generator<{ full: string; relative: string }> {
  let entries: { name: string; isDir: boolean }[] = []
  try {
    entries = readdirSync(dir, { withFileTypes: true }).map((d) => ({
      name: d.name,
      isDir: d.isDirectory()
    }))
  } catch {
    return
  }

  for (const e of entries) {
    const full = path.join(dir, e.name)
    const rel = path.relative(base, full).replace(/\\/g, '/')

    if (e.isDir) {
      if (SKIP_DIRS.includes(e.name)) continue
      yield* walkDir(full, base)
    } else {
      const ext = path.extname(e.name).toLowerCase()
      if (IMAGE_EXT.includes(ext)) yield { full, relative: rel }
    }
  }
}

function categoryFromRelative(relativePath: string): string {
  const dir = path.dirname(relativePath)
  if (!dir || dir === '.') return 'Genel'
  const parts = dir.replace(/\\/g, '/').split('/')
  return parts[parts.length - 1] || 'Genel'
}

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public')
    const images: { path: string; name: string; category: string; url: string }[] = []
    const categories = new Set<string>()

    for (const { relative } of walkDir(publicDir, publicDir)) {
      const url = '/' + relative
      const name = path.basename(relative)
      const category = categoryFromRelative(relative)
      categories.add(category)
      images.push({ path: url, name, category, url })
    }

    const catList = ['Genel', ...Array.from(categories).filter((c) => c !== 'Genel').sort()]

    return NextResponse.json({
      categories: catList,
      images
    })
  } catch (e) {
    console.error('[gallery]', e)
    return NextResponse.json(
      { categories: ['Genel'], images: [] },
      { status: 200 }
    )
  }
}
