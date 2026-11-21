import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'absolute-opengraph-urls',
        transformIndexHtml(html: string) {
          const candidates = [
            process.env.VITE_SITE_URL,
            process.env.VERCEL_PROJECT_PRODUCTION_URL
              ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
              : '',
            process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
            process.env.APP_URL,
          ];
          const validOrigin = candidates.find(
            (val): val is string =>
              typeof val === 'string' &&
              (val.startsWith('https://') || val.startsWith('http://'))
          );
          if (!validOrigin) {
            return html;
          }
          const baseUrl = validOrigin.replace(/\/+$/, '');
          const absoluteOgImage = `${baseUrl}/og-image.jpg`;
          const absoluteOgLogo = `${baseUrl}/favicon-192x192.png`;
          const absoluteUrl = `${baseUrl}/`;
          const injectedTags = [
            `<link rel="canonical" href="${absoluteUrl}" />`,
            `<meta property="og:url" content="${absoluteUrl}" />`,
            absoluteOgImage.startsWith('https://')
              ? `<meta property="og:image:secure_url" content="${absoluteOgImage}" />`
              : '',
          ]
            .filter(Boolean)
            .join('\n    ');

          return html
            .replaceAll('"/og-image.jpg"', `"${absoluteOgImage}"`)
            .replaceAll('"/favicon-192x192.png"', `"${absoluteOgLogo}"`)
            .replace('</head>', `    ${injectedTags}\n  </head>`);
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(rootDir, 'dist');
          const srcAssets = path.resolve(rootDir, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
