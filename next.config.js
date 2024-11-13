/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['flag-icons'],
  images: {
    remotePatterns: ['wendogo-f972c21756e5.herokuapp.com'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wendogo-f972c21756e5.herokuapp.com',
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
