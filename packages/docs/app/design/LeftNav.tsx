"use client";

import Link from "next/link";

interface LeftNavProps {
  paths: {
    label: string;
    slug: string;
  }[];
}

export const LeftNav = ({ paths }: LeftNavProps) => {
  return (
    <ul>
      {paths.map(({ slug, label }) => (
        <Link key={slug} href={slug}>
          <li>{label}</li>
        </Link>
      ))}
    </ul>
  );
};
