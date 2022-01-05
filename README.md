# nextjs-components

A collection of React components, transcribed from https://vercel.com/design. [^1]

[^1]: This is not affiliated with [Vercel](https://vercel.com)

[![npm latest package](https://img.shields.io/npm/v/nextjs-components/latest.svg)](https://www.npmjs.com/package/nextjs-components) [![npm next package](https://img.shields.io/npm/v/nextjs-components/next.svg)](https://www.npmjs.com/package/nextjs-components)

![](https://badgen.net/bundlephobia/min/nextjs-components) ![](https://badgen.net/bundlephobia/minzip/nextjs-components)

![](https://badgen.net/bundlephobia/dependency-count/nextjs-components) ![](https://badgen.net/bundlephobia/tree-shaking/nextjs-components)

## Motivation

TBD

### Todo's

- [ ] Unit test coverage
- [ ] Unit tests in CI (Github workflows)
- [ ] Add every component to the docs site
- [ ] Deploy the docs site
- [x] Report Bundle size
- [ ] Figure out monorepo situation
  - Lerna? Turborepo?
  - 1 Large components-package or multiple per-component packages?

## Installation

```bash
# with npm
npm i nextjs-components
```

```bash
# with yarn
yarn add nextjs-components
```

This project uses TypeScript and CSS modules. It relies on [next-transpile-modules](https://github.com/martpie/next-transpile-modules) to work in a Next.js app.

```bash
yarn add next-transpile-modules
```

## Usage

![image](https://user-images.githubusercontent.com/26389321/148150047-7c3f530e-cfc5-4f29-8a61-eb08d4397851.png)


### With `Next.js`

[CodeSandbox](https://codesandbox.io/s/nextjs-components-next-t7vil)

Transpile ♻️

```js
// next.config.js
const withTM = require("next-transpile-modules")(["nextjs-components"]);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
```

Import Global CSS 💅

```tsx
// pages/_app.tsx
import "nextjs-components/dist/styles/globals.css";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;
```

Import Components 🎉

```tsx
// pages/index.tsx
import { Button } from "nextjs-components/dist/components/Button";
import { Checkbox } from "nextjs-components/dist/components/Checkbox";
import { LoadingDots } from "nextjs-components/dist/components/LoadingDots";
import { Spinner } from "nextjs-components/dist/components/Spinner";
import { Spacer } from "nextjs-components/dist/components/Spacer";
import { Text } from "nextjs-components/dist/components/Text";
import { Container } from "nextjs-components/dist/components/Container";
import { fs } from "nextjs-components/dist/components/Fieldset";

export default function IndexPage() {
  return (
    <Container center>
      <Text h1 noMargin>
        Hello World
      </Text>
      <Text h2 noMargin>
        Hello World
      </Text>
      <Text h3 noMargin>
        Hello World
      </Text>

      <Spacer />

      <fs.Fieldset>
        <fs.Content>
          <fs.Title>The Holland Lop Jumped over the Fence</fs.Title>
          <fs.Subtitle>The Holland Lop Jumped over the Fence</fs.Subtitle>
        </fs.Content>
        <fs.Footer>
          <fs.Footer.Status>
            The Holland lop Jumped over the Fence
            <Spacer />
          </fs.Footer.Status>
          <fs.Footer.Actions>
            <Button size="small">Action</Button>
          </fs.Footer.Actions>
        </fs.Footer>
      </fs.Fieldset>

      <Spacer />
      <Button>A button!</Button>
      <Spacer />
      <Checkbox>A checkbox</Checkbox>
      <Spacer />
      <LoadingDots size={8} />
      <Spacer />
      <Spinner />
    </Container>
  );
}
```

### With `create-react-app`

[CodeSandbox](https://codesandbox.io/s/nextjs-components-zhbkv)

```jsx
// App.js
import "nextjs-components/dist/styles/globals.css";

import { Button } from "nextjs-components/dist/components/Button";
import { Checkbox } from "nextjs-components/dist/components/Checkbox";
import { LoadingDots } from "nextjs-components/dist/components/LoadingDots";
import { Spinner } from "nextjs-components/dist/components/Spinner";
import { Spacer } from "nextjs-components/dist/components/Spacer";
import { Text } from "nextjs-components/dist/components/Text";
import { Container } from "nextjs-components/dist/components/Container";
import { fs } from "nextjs-components/dist/components/Fieldset";

export default function App() {
  return (
    <Container center>
      <Text h1 noMargin>
        Hello World
      </Text>
      <Text h2 noMargin>
        Hello World
      </Text>
      <Text h3 noMargin>
        Hello World
      </Text>

      <Spacer />

      <fs.Fieldset>
        <fs.Content>
          <fs.Title>The Holland Lop Jumped over the Fence</fs.Title>
          <fs.Subtitle>The Holland Lop Jumped over the Fence</fs.Subtitle>
        </fs.Content>
        <fs.Footer>
          <fs.Footer.Status>
            The Holland lop Jumped over the Fence
            <Spacer />
          </fs.Footer.Status>
          <fs.Footer.Actions>
            <Button size="small">Action</Button>
          </fs.Footer.Actions>
        </fs.Footer>
      </fs.Fieldset>

      <Spacer />
      <Button>A button!</Button>
      <Spacer />
      <Checkbox>A checkbox</Checkbox>
      <Spacer />
      <LoadingDots size={8} />
      <Spacer />
      <Spinner />
    </Container>
  );
}
```

## Docs Preview

![image](https://user-images.githubusercontent.com/26389321/148008111-2bde682a-991e-4fa8-b347-77aa9ec9fe49.png)
