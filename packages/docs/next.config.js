const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
const withTM = require('next-transpile-modules')(['nextjs-components']);
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
}

module.exports = withPlugins(plugins, nextConfig);