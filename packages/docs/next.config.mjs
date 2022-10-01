// `rehype-slug` is ESM-only, so next.config needs to be
// a `.mjs` file. https://github.com/vercel/next.js/issues/9607#issuecomment-944156493
//
// if using `.js`, you may see "SyntaxError: Cannot use import statement outside a module"
import withMDX from "@next/mdx";
import withPlugins from "next-compose-plugins";
import withTM from "next-transpile-modules";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const plugins = [
  withMDX({
    extension: /\.mdx?$/,
    options: {
      // remarkGfm is required to process syntax like tables
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug, // inject `id` into headings
        [
          rehypeAutolinkHeadings,
          { behavior: "wrap", test: ["h2", "h3", "h4", "h5", "h6"] },
        ],
      ],
      // this is here since we're using `MDXProvider`
      providerImportSource: "@mdx-js/react",
    },
  }),
  withTM(["nextjs-components", "../core"]),
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["mdx", "tsx", "ts"],
};

export default withPlugins(plugins, nextConfig);
