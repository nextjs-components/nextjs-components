import "react";

declare module "react" {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    // https://github.com/vercel/styled-jsx/issues/90
    jsx?: boolean;
    global?: boolean;
  }
}
