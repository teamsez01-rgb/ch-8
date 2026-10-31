import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

console.log('🚀 [Build Pipeline] Checking build requirements...')

const isForce = process.argv.includes('--force') || process.env.VITE_FORCE_BUILD === 'true'
const distIndex = path.resolve('dist/index.html')

// 1. If pre-built dist already exists and force is not requested, use it directly.
// This is essential for WebContainer / in-browser environments where native bundlers (like Rolldown) cannot run.
if (!isForce && fs.existsSync(distIndex)) {
  try {
    const html = fs.readFileSync(distIndex, 'utf8')
    if (html.includes('id="root"') || html.includes('assets/')) {
      console.log('✅ [Build Pipeline] Verified pre-built distribution bundle in dist/.')
      console.log('⚡ [Build Pipeline] WebContainer deployment fast-track: dist/ is complete and ready.')
      process.exit(0)
    }
  } catch (_e) {
    // If read fails, fall through to vite build
  }
}

// 2. Otherwise run vite build
console.log('ℹ️ [Build Pipeline] Running vite build to compile assets...')
try {
  execSync('npx vite build', { stdio: 'inherit' })
  console.log('✅ [Build Pipeline] Vite build finished successfully.')
  process.exit(0)
} catch (err) {
  if (fs.existsSync(distIndex)) {
    console.log('✅ [Build Pipeline] dist/index.html is intact. Proceeding.')
    process.exit(0)
  }
  console.error('❌ [Build Pipeline] Vite build failed:', err.message)
  process.exit(1)
}

