// `rehype-slug` is ESM-only, so next.config needs to be
// a `.mjs` file. https://github.com/vercel/next.js/issues/9607#issuecomment-944156493
//
// if using `.js`, you may see "SyntaxError: Cannot use import statement outside a module"
import withMDX from '@next/mdx';
import withPlugins from 'next-compose-plugins';
import withTM from 'next-transpile-modules';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const plugins = [
  withMDX({
    extension: /\.mdx?$/,
    options: {
      // remarkGfm is required to process syntax
      // like tables
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
      // this is here since we're using `MDXProvider`
      providerImportSource: '@mdx-js/react',
    },
  }),
  withTM(['nextjs-components', '../core']),
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['mdx', 'jsx', 'js', 'tsx', 'ts'],
  webpack: (config, options) => {
    // if (options.isServer) {
    //   config.externals = ['react', ...config.externals];
    // }

    // // if using next.config.mjs, ReferenceError: __dirname is not defined
    // // - https://stackoverflow.com/a/66651120/9823455
    // const __dirname = new URL('.', import.meta.url).pathname;
    // // Point to 1 copy of react
    // config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');

    return config;
  },
};

export default withPlugins(plugins, nextConfig);
