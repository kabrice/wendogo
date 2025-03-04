/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['flag-icons'],
  images: { 
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/school_logos/**',
      },
      // Add your production domain pattern if needed
      {
        protocol: 'https',
        hostname: 'wendogo.com',
        pathname: '/school_logos/**',
      },
    ],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Convert SVG imports to React components
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false, // Disable SVGO optimization
              // Or use specific SVGO config to preserve attributes
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                        removeUnknownsAndDefaults: false,
                        cleanupIDs: false,
                        mergePaths: false,
                        prefixIds: false,
                        cleanupNumericValues: false,
                      },
                    },
                  },
                ],
              },
              prettier: false,
              titleProp: true,
            },
          },
        ],
      },
      // Fallback to asset/resource if ?url is specified
      {
        test: /\.svg$/,
        resourceQuery: /url/,
        use: ['file-loader'],
      },
      // Add support for video files
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext]'
        }
      }
    );

    // Modify the file loader rule to ignore *.svg
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://wendogo-f972c21756e5.herokuapp.com/api/:path*',
      },
    ];
  },
  // Update experimental options
  experimental: {
    optimizeCss: false, // Disable this if you're still having issues
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
