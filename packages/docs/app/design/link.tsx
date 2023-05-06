"use client";

import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function Link({ children, href, className = "" }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <NextLink
      className={clsx(
        "cursor-pointer text-inherit no-underline outline-none",
        className,
      )}
      href={href}
    >
      <span
        className={clsx(
          "-mx-4 flex h-10 items-center rounded-md px-4 py-2 text-[--accents-5] transition-all duration-100",
          "hover:bg-[--accents-1] hover:text-[--geist-foreground]",
          { ["bg-[--hover] text-[--geist-foreground]"]: active },
          "text-sm font-normal leading-5",
        )}
      >
        {children}
      </span>
    </NextLink>
  );
}
