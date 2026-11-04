import { readFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

const SEO_FILE = 'src/data/seo.json'
const SEO_FIELDS = ['title', 'description', 'shareDescription'] as const

/** Reads seo.json (published by the Site Content Manager); anything but its exact shape fails the build. */
function readSeo(root: string): Record<(typeof SEO_FIELDS)[number], string> {
  const seo = JSON.parse(readFileSync(path.join(root, SEO_FILE), 'utf8'))
  const home = seo?.home
  const valid =
    Object.keys(seo ?? {}).join() === 'home' &&
    Object.keys(home ?? {}).sort().join() === [...SEO_FIELDS].sort().join() &&
    SEO_FIELDS.every((field) => typeof home[field] === 'string' && home[field].trim() !== '')
  if (!valid) {
    throw new Error(`${SEO_FILE} is not valid: expected { home: { ${SEO_FIELDS.join(', ')} } } with non-empty texts`)
  }
  return home
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Fills the %SEO_*% placeholders of index.html from seo.json. */
function seoTexts(): Plugin {
  let root = process.cwd()
  return {
    name: 'seo-texts',
    configResolved(config) {
      root = config.root
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const seo = readSeo(root)
        return html
          .replaceAll('%SEO_TITLE%', escapeHtml(seo.title))
          .replaceAll('%SEO_DESCRIPTION%', escapeHtml(seo.description))
          .replaceAll('%SEO_SHARE_DESCRIPTION%', escapeHtml(seo.shareDescription))
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    seoTexts(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
})
