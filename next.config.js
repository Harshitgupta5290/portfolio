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
}