import { notFound } from "next/navigation";

import nodes from "../nodes.json";
import Post from "./post";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  return {
    title: `${slug} | Nextjs Components`,
  };
}

export default async function Slug({ params }: Props) {
  const slug = (await params).slug;

  if (!nodes.some(({ path }) => path === `/design/${slug}`)) {
    notFound();
  }

  return <Post slug={slug} />;
}
