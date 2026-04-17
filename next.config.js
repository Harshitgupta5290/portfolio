const path = require('path')

module.exports = {
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  async redirects() {
    if (process.env.NODE_ENV === 'production') return [];
    return [{ source: '/', destination: '/portfolio', permanent: false, basePath: false }];
  },
  basePath: '/portfolio',
  assetPrefix: '/portfolio',
  compress: true,
  productionBrowserSourceMaps: false,

  // ── Compiler optimisations ───────────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // ── Experimental ────────────────────────────────────────────────────────
  experimental: {
    // Tree-shake large packages — critical once Three.js is added
    optimizePackageImports: [
      'react-icons',
      'lottie-react',
      'framer-motion',
    ],
    // Only inline CSS in production — causes blank-screen issues in dev
    ...(process.env.NODE_ENV === 'production' ? { optimizeCss: true } : {}),
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'app/css')],
  },

  env: {
    NEXT_PUBLIC_BASE_PATH: '/portfolio',
  },

  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
    formats: ['image/avif', 'image/webp'],
    // Explicit device sizes so Next.js generates only the breakpoints you need
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 200, 256, 280, 384],
    // Minimise re-optimisation in production
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
    ],
  },

  // ── HTTP headers (dev server only — add to CDN/Vercel config for prod) ──
  async headers() {
    if (process.env.NODE_ENV === 'production') return [];
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      {
        // Aggressive caching for static assets
        source: '/(.*)\\.(woff2|woff|ttf|svg|png|jpg|jpeg|webp|avif|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
}