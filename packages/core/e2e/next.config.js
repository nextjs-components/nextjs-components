const withTM = require("next-transpile-modules");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // https://github.com/adobe/react-spectrum/issues/3515
  // must be false or else this breaks FocusScope
  reactStrictMode: false,
  pageExtensions: ["mdx", "tsx", "ts"],
};

module.exports = withTM(["nextjs-components"])(nextConfig);
