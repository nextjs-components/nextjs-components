"use client";

import { ThemeProvider } from "next-themes";
import "nextjs-components/src/styles/globals.css";

// Must have html and body tags or else:
// Uncaught Error: invariant expected app router to be mounted
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          enableSystem
          value={{
            dark: "dark-theme", // specific html tag class used by all components' css
            system: "system", // arbitrary
            light: "light-theme", // arbitrary
          }}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
