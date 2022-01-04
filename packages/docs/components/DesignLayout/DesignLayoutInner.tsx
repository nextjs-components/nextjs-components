import { useState } from "react";
import { MDXProvider } from "@mdx-js/react";

import { Button } from "nextjs-components/src/components/Button";
import { Editor } from "nextjs-components/src/components/Editor";
import { Container } from "nextjs-components/src/components/Container";
import { fs } from "nextjs-components/src/components/Fieldset";
import { Tree, Folder, File } from "nextjs-components/src/components/FileTree";
import { LoadingDots } from "nextjs-components/src/components/LoadingDots";
import { Spacer } from "nextjs-components/src/components/Spacer";
import { Spinner } from "nextjs-components/src/components/Spinner";
import { Text } from "nextjs-components/src/components/Text";
import { useToasts } from "nextjs-components/src/components/Toast";
import { Toggle } from "nextjs-components/src/components/Toggle";

import { ArrowUp as Up } from "nextjs-components/src/icons";

const components = {
  h1: (props) => <Text h1 {...props} />,
  h2: (props) => <Text h2 {...props} />,
  h3: (props) => <Text h3 {...props} />,
  h4: (props) => <Text h4 {...props} />,
  h5: (props) => <Text h5 {...props} />,
  h6: (props) => <Text h6 {...props} />,
  p: (props) => <Text p {...props} />,
  pre: ({ children }) => {
    return (
      <Editor
        scope={{ Container, Button, Up }}
        code={children.props.children}
      />
    );
  },
};

const componentCatalogueForLiveEditor = {
  Text,
  Spacer,
  Button,
  Container,
  Tree,
  Folder,
  File,
  LoadingDots,
  Spinner,
  Up,
  useToasts,
  useState,
  Toggle,
  fs,
  BlueContainer: ({ style, ...props }) => (
    <Container
      style={{
        ...style,
        background: "var(--geist-success)",
        color: "rgb(255, 255, 255)",
        padding: "var(--geist-gap-half)",
        borderRadius: "var(--geist-radius)",
      }}
      {...props}
    />
  ),
};

const getLiveEditorWithScope = (componentNames: string[] = []) => {
  const scope = componentNames.reduce((acc, next) => {
    acc[next] = componentCatalogueForLiveEditor[next];
    return acc;
  }, {});
  return {
    /* transform ```codeblock``` into live editor*/
    pre: ({ children }) => {
      return <Editor scope={scope} code={children.props.children} />;
    },
  };
};

export default function DesignLayoutInner({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
