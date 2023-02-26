"use client";

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
import Select from "./select.mdx";
import ShowMore from "./show-more.mdx";
import Spinner from "./spinner.mdx";
import Stack from "./stack.mdx";
import StatusDot from "./status-dot.mdx";
import Switch from "./switch.mdx";
import Table from "./table.mdx";
import Text from "./text.mdx";
import Toggle from "./toggle.mdx";

export default function Slug({ params: { slug } }) {
  const Page = () => {
    switch (slug) {
      case "button":
        return <Button />;
      case "capacity":
        return <Capacity />;
      case "entity":
        return <Entity />;
      case "fieldset":
        return <Fieldset />;
      case "file-tree":
        return <FileTree />;
      case "input":
        return <Input />;
      case "keyboard-input":
        return <KeyboardInput />;
      case "loading-dots":
        return <LoadingDots />;
      case "menu":
        return <Menu />;
      case "modal":
        return <Modal />;
      case "radio":
        return <Radio />;
      case "select":
        return <Select />;
      case "show-more":
        return <ShowMore />;
      case "spinner":
        return <Spinner />;
      case "stack":
        return <Stack />;
      case "status-dot":
        return <StatusDot />;
      case "switch":
        return <Switch />;
      case "table":
        return <Table />;
      case "text":
        return <Text />;
      case "toggle":
        return <Toggle />;

      default:
        return (
          <div>
            <h1>🚧 Under construction 🚧</h1>
            In the process of migrating to the Next.js 13 App Dir.
          </div>
        );
    }
  };

  return <Page />;
}
