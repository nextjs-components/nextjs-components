import React, { useState } from "react";
import { MDXProvider } from "@mdx-js/react";

import { Button } from "nextjs-components";
import { Editor } from "nextjs-components/dist/components/Editor";
import { ColorCard } from "nextjs-components/dist/components/ColorCard";
import { Container } from "nextjs-components";
import { fs } from "nextjs-components";
import { Tree, Folder, File } from "nextjs-components";
import { LoadingDots } from "nextjs-components";
import { Toggle } from "nextjs-components";
import { Spacer } from "nextjs-components";
import { Spinner } from "nextjs-components";
import { Text } from "nextjs-components";
import { useToasts } from "nextjs-components";

import { ArrowUp as Up } from "nextjs-components/dist/icons";

const BlueContainer = ({ style, children, ...props }) => (
  <Container
    style={{
      ...style,
      background: "var(--geist-success)",
      color: "rgb(255, 255, 255)",
      padding: "var(--geist-gap-half)",
      borderRadius: "var(--geist-radius)",
    }}
    {...props}
  >
    {children}
  </Container>
);

/**
 * This components fulfill in-MDX code blocks that use JSX.
 */
const editorScope = {
  Container,
  Button,
  Up,
  BlueContainer,
  Text,
  fs,
  Tree,
  Folder,
  File,
  LoadingDots,
  useState,
  Spinner,
  useToasts,
  Toggle,
};

const mdxComponents = {
  Text,
  h1: (props) => <Text h1 {...props} />,
  h2: (props) => <Text h2 {...props} />,
  h3: (props) => <Text h3 {...props} />,
  h4: (props) => <Text h4 {...props} />,
  h5: (props) => <Text h5 {...props} />,
  h6: (props) => <Text h6 {...props} />,
  p: (props) => <Text p {...props} />,
  pre: ({ children }) => {
    return <Editor scope={editorScope} code={children.props.children} />;
  },
  ColorCard,
  Spacer,
};

export default function DesignLayoutInner({ children }) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
