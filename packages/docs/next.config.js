const path = require("path")
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
const withTM = require('next-transpile-modules')(['nextjs-components', '../core']);
const withPlugins = require("next-compose-plugins");

const plugins = [
  withMDX,
  withTM
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['mdx', 'jsx', 'js', 'tsx', 'ts'],
  webpack: (config, options) => {
    if (options.isServer) {
      config.externals = ['react', ...config.externals];
    }

    // point to 1 copy of react
    config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');

    return config
  },
}

module.exports = withPlugins(plugins, nextConfig);