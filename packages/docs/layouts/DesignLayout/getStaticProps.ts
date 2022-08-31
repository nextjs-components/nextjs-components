import * as fs from "fs";
import type { GetStaticProps } from "next";
import * as path from "path";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const dir = path.join(process.cwd(), "pages/docs");
  const paths = fs
    .readdirSync(dir)
    .map((e) => path.join("/docs", e.replace(".mdx", "")));
  return {
    props: {
      paths,
    },
  };
};
