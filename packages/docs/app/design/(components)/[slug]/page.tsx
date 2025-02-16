import { type ResolvingMetadata } from "next";
import { type PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata,
) {
  return {
    title: `${params.slug} | Nextjs Components`,
  };
}

export default async function Slug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Post } = await import(`./${slug}.mdx`);

  return <Post />;
}
