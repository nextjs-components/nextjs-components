import "nextjs-components/src/styles/globals.css";

// Must have html and body tags or else:
// Uncaught Error: invariant expected app router to be mounted
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
