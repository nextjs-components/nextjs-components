import { type ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type PropsWithChildren } from "react";

import Renderer from "./renderer";

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

export default async function Slug({ params: { slug } }) {
  return <Renderer slug={slug} />;
}
