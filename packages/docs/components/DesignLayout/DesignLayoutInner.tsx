import React, { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";

import { Avatar } from "nextjs-components";
import { Button } from "../../../core/src/components/Button";
import { Editor } from "nextjs-components/dist/components/Editor";
import { Checkbox } from "nextjs-components";
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
import { KBD } from "nextjs-components";
import {
  Entity,
  EntityField,
  EntityThumbnail,
} from "nextjs-components/dist/components/Entity";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuWrapper,
  MenuLink,
} from "../../../core/src/components/Menu";

import {
  ArrowUp as Up,
  GitHub,
  FacebookIcon,
  GoogleIcon,
} from "nextjs-components/dist/icons";

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
  Avatar,
  BlueContainer,
  Button,
  Checkbox,
  Container,
  Entity,
  EntityField,
  EntityThumbnail,
  Facebook: FacebookIcon,
  File,
  Folder,
  fs,
  GitHub,
  Google: GoogleIcon,
  isMounted: true,
  KBD,
  Link,
  LoadingDots,
  Menu,
  MenuButton,
  MenuItem,
  MenuWrapper,
  MenuLink,
  Spacer,
  Spinner,
  Text,
  Toggle,
  Tree,
  Up,
  useState,
  useToasts,
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
  Link,
};

export default function DesignLayoutInner({ children }) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
