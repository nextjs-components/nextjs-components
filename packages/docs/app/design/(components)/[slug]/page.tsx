"use client";

import { MDXProvider } from "@mdx-js/react";

import { mdxComponents } from "@/mdx-components";

import Button from "./button.mdx";
import Capacity from "./capacity.mdx";
import Entity from "./entity.mdx";
import Fieldset from "./fieldset.mdx";
import FileTree from "./file-tree.mdx";
import Input from "./input.mdx";
import KeyboardInput from "./keyboard-input.mdx";
import LoadingDots from "./loading-dots.mdx";
import Menu from "./menu.mdx";
import Modal from "./modal.mdx";
import Radio from "./radio.mdx";

export default function Slug({ params: { slug } }) {
  const Page = () => {
    // prettier-ignore
    switch (slug) {
      case "button":   return <Button />;
      case "capacity": return <Capacity />;
      case "entity":   return <Entity />;
      case "fieldset": return <Fieldset />;
      case "file-tree":   return <FileTree />;
      case "input":    return <Input />;
      case "keyboard-input": return <KeyboardInput />;
      case "loading-dots": return <LoadingDots />;
      case "menu": return <Menu />
      case "modal": return <Modal/>
      case "radio": return <Radio/>

      default:
        return (
          <div>
            <h1>🚧 Under construction 🚧</h1>
            In the process of migrating to the Next.js 13 App Dir.
          </div>
        );
    }
  };

  return (
    <MDXProvider components={mdxComponents}>
      <Page />
    </MDXProvider>
  );
}
