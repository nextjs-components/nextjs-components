import clsx from "clsx";
import NextImage from "next/image";
import React from "react";
import { memo, useEffect, useState } from "react";

interface ImageProps {
  alt?: string;
  src: string;
  width: number;
  height: number;
}
/**
 * used for local preview
 */
const Image = memo(({ src, alt, width, height }: ImageProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <figure className={clsx({ ["show"]: mounted })}>
      <div
        // used to be a main tag but this violated Safari's
        // accessibility `testForMultipleMainContentSections` audit
        className="main"
        style={{ width }}
      >
        <div className="container">
          {src && (
            <NextImage
              // https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/placeholder.js
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475),
              )}`}
              src={src}
              width={width}
              height={height}
              alt={alt}
            />
          )}
        </div>
      </div>
      <style jsx>{`
        figure {
          opacity: 0;
          display: block;
          text-align: center;
          margin: 0px 0;
        }
        figure.show {
          opacity: 1;
          -webkit-transition: opacity 0.2s
            cubic-bezier(0.455, 0.03, 0.515, 0.955);
          transition: opacity 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }
        .main {
          margin: 0 auto;
          max-width: 100%;
        }
        .container {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;

          position: relative;
        }
        .container :global(img) {
          object-fit: cover;
        }
      `}</style>
    </figure>
  );
});

export default Image;

// https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/shimmer.js
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
