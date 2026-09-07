import withMDX from "@next/mdx";
import { fileURLToPath } from "node:url";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts", "mdx"],
  transpilePackages: ["nextjs-components", "../core"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    // Use plugin paths so Turbopack can serialize the MDX options.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      fileURLToPath(new URL("./rehype-starry-night.mjs", import.meta.url)),
      "rehype-slug", // inject `id` into headings
      [
        "rehype-autolink-headings",
        { behavior: "wrap", test: ["h3", "h4", "h5", "h6"] },
      ],
    ],
  },
})(nextConfig);
