<p align="center">
  <b>nextjs-components</b>
</p>

A collection of React components, transcribed from https://vercel.com/design

**Note:** This is not affiliated with [Vercel](https://vercel.com)

[![npm latest package](https://img.shields.io/npm/v/nextjs-components/latest.svg)](https://www.npmjs.com/package/nextjs-components)
[![npm next package](https://img.shields.io/npm/v/nextjs-components/next.svg)](https://www.npmjs.com/package/nextjs-components)

## Installation

```bash
# with npm
npm i nextjs-components
```

```bash
# with yarn
yarn add nextjs-components
```

## Usage

```tsx
// pages/_app.tsx
import "nextjs-components/src/styles/globals.css";
```

```tsx
// pages/home.tsx
import { Badge } from "nextjs-components/src/components/Badge";

export default function Home() {
  return (
    <div>
      <Badge>A badge component</Badge>
    </div>
  );
}
```
