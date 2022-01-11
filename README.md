# nextjs-components

A collection of React components, transcribed from https://vercel.com/design. [^1]

[^1]: This is not affiliated with [Vercel](https://vercel.com)

[![npm latest package](https://img.shields.io/npm/v/nextjs-components/latest.svg)](https://www.npmjs.com/package/nextjs-components) [![npm next package](https://img.shields.io/npm/v/nextjs-components/next.svg)](https://www.npmjs.com/package/nextjs-components)

![](https://badgen.net/bundlephobia/min/nextjs-components) ![](https://badgen.net/bundlephobia/minzip/nextjs-components)

![](https://badgen.net/bundlephobia/dependency-count/nextjs-components) ![](https://badgen.net/bundlephobia/tree-shaking/nextjs-components)

![image](https://user-images.githubusercontent.com/26389321/148666532-b74520e6-a41c-48a0-a3c6-82cf0674d68a.png)

## Motivation

[Blog post](https://thekevinwang.com/2022/01/09/nextjs-components/) from 01/09/2022

### Todo's

- [ ] Unit test coverage
- [ ] Unit tests in CI (Github workflows)
- [ ] Add every component to the docs site
- [ ] Deploy the docs site
- [x] Report Bundle size
- [ ] Figure out monorepo situation
  - Lerna? Turborepo?
  - 1 Large components-package or multiple per-component packages?
- [ ] Move Todo's to [project board](https://github.com/nextjs-components/nextjs-components/projects?type=beta)

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

### With `Next.js`

[CodeSandbox](https://codesandbox.io/s/nextjs-components-next-t7vil)

<details>
  <summary>Hide/Show Example Code</summary>

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

import {
  ThemeContextProvider,
  ToastsProvider,
  ToastArea,
} from "nextjs-components";

function App({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <ToastsProvider>
        <Component {...pageProps} />
        <ToastArea />
      </ToastsProvider>
    </ThemeContextProvider>
  );
}

export default App;
```

Import Components 🎉

```tsx
// pages/index.tsx
import {
  Button,
  Checkbox,
  Container,
  fs,
  LoadingDots,
  Spacer,
  Spinner,
  Text,
  useTheme,
  useToasts,
  IconSizeContext,
  Toggle,
} from "nextjs-components";

import { Sun, Moon } from "nextjs-components/dist/icons";

export default function IndexPage() {
  const { selectTheme, isDarkMode } = useTheme();
  const toast = useToasts();

  return (
    <Container center>
      <Container row vcenter>
        <IconSizeContext.Provider value={{ size: 18 }}>
          <Sun />
          <Spacer x={0.4} />
          <Toggle
            checked={isDarkMode}
            onChange={(checked) => {
              selectTheme(checked ? "dark" : "light");
              toast.current.message(
                `Theme has been set to ${checked ? "dark" : "light"}`
              );
            }}
          />
          <Spacer x={0.4} />
          <Moon />
        </IconSizeContext.Provider>
      </Container>
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

</details>

### With `create-react-app`

[CodeSandbox](https://codesandbox.io/s/nextjs-components-zhbkv)

<details>
  <summary>Hide/Show Example Code</summary>

```jsx
// index.js
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import "nextjs-components/dist/styles/globals.css";

import {
  ThemeContextProvider,
  ToastsProvider,
  ToastArea,
} from "nextjs-components";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ThemeContextProvider>
      <ToastsProvider>
        <App />
        <ToastArea />
      </ToastsProvider>
    </ThemeContextProvider>
  </StrictMode>,
  rootElement
);
```

```jsx
// App.js
import {
  Button,
  Checkbox,
  Container,
  fs,
  LoadingDots,
  Spacer,
  Spinner,
  Text,
  useTheme,
  useToasts,
  IconSizeContext,
  Toggle,
} from "nextjs-components";

import { Sun, Moon } from "nextjs-components/dist/icons";

export default function App() {
  const { selectTheme, isDarkMode } = useTheme();
  const toast = useToasts();

  return (
    <Container center>
      <Container row vcenter>
        <IconSizeContext.Provider value={{ size: 18 }}>
          <Sun />
          <Spacer x={0.4} />
          <Toggle
            checked={isDarkMode}
            onChange={(checked) => {
              selectTheme(checked ? "dark" : "light");
              toast.current.message(
                `Theme has been set to ${checked ? "dark" : "light"}`
              );
            }}
          />
          <Spacer x={0.4} />
          <Moon />
        </IconSizeContext.Provider>
      </Container>
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

</details>
