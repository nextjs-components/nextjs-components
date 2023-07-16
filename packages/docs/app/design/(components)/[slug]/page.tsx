"use client";

import Breadcrumbs from "./breadcrumbs.mdx";
import Button from "./button.mdx";
import Calendar from "./calendar.mdx";
import Capacity from "./capacity.mdx";
import Combobox from "./combobox.mdx";
import Description from "./description.mdx";
import Entity from "./entity.mdx";
import Fieldset from "./fieldset.mdx";
import FileTree from "./file-tree.mdx";
import Input from "./input.mdx";
import KeyboardInput from "./keyboard-input.mdx";
import LoadingDots from "./loading-dots.mdx";
import Menu from "./menu.mdx";
import Modal from "./modal.mdx";
import Note from "./note.mdx";
import Radio from "./radio.mdx";
import Select from "./select.mdx";
import ShowMore from "./show-more.mdx";
import Spinner from "./spinner.mdx";
import Stack from "./stack.mdx";
import StatusDot from "./status-dot.mdx";
import Switch from "./switch.mdx";
import Table from "./table.mdx";
import Tabs from "./tabs.mdx";
import Text from "./text.mdx";
import Textarea from "./textarea.mdx";
import Toggle from "./toggle.mdx";
import Tooltip from "./tooltip.mdx";

export default function Slug({ params: { slug } }) {
  const Page = () => {
    switch (slug) {
      case "breadcrumbs":
        return <Breadcrumbs />;
      case "button":
        return <Button />;
      case "calendar":
        return <Calendar />;
      case "capacity":
        return <Capacity />;
      case "combobox":
        return <Combobox />;
      case "description":
        return <Description />;
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
      case "note":
        return <Note />;
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
      case "tabs":
        return <Tabs />;
      case "text":
        return <Text />;
      case "textarea":
        return <Textarea />;
      case "toggle":
        return <Toggle />;
      case "tooltip":
        return <Tooltip />;

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
