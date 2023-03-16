"use client";

import { ThemeContextProvider } from "nextjs-components/src/contexts/ThemeContext";
import "nextjs-components/src/styles/globals.css";

import "./pretty-lights.css";

// Must have html and body tags or else:
// Uncaught Error: invariant expected app router to be mounted
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  );
}
