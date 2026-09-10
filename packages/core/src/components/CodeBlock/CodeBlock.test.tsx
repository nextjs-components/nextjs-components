import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { useState } from "react";

import { CodeBlock } from "./CodeBlock";

const source = "const count = 1;\n\nconsole.log(count);";

afterEach(() => {
  window.history.replaceState(null, "", "/");
  jest.useRealTimers();
});

it("preserves source and copies it without line numbers or diff markers", async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
  const { container } = render(
    <CodeBlock
      language="js"
      filename="example.js"
      addedLinesNumbers={[3]}
      removedLinesNumbers={[1]}
      highlightedLinesNumbers={[2]}
    >
      {source}
    </CodeBlock>,
  );
  expect(
    container.querySelectorAll("[data-geist-code-block-line]"),
  ).toHaveLength(3);
  expect(container.querySelector('[data-added="true"]')).toHaveTextContent(
    "console.log(count)",
  );
  expect(container.querySelector('[data-removed="true"]')).toHaveTextContent(
    "const count = 1",
  );
  expect(
    container.querySelector('[data-highlighted="true"]'),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Copy to clipboard" }));
  await waitFor(() => expect(writeText).toHaveBeenCalledWith(source));
  expect(
    await screen.findByRole("button", { name: "Copied to clipboard" }),
  ).toBeInTheDocument();
});

it("uses textToCopy, reports clipboard failure, and permits retry", async () => {
  const writeText = jest
    .fn()
    .mockRejectedValueOnce(new Error("denied"))
    .mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
  const trackCopy = jest.fn();
  render(
    <CodeBlock language="text" textToCopy="replacement" trackCopy={trackCopy}>
      {source}
    </CodeBlock>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Copy to clipboard" }));
  fireEvent.click(
    await screen.findByRole("button", { name: "Could not copy. Try again" }),
  );
  await screen.findByRole("button", { name: "Copied to clipboard" });
  expect(writeText).toHaveBeenLastCalledWith("replacement");
  expect(trackCopy).toHaveBeenCalledTimes(2);
});

it("cleans up pending copy feedback on unmount", async () => {
  jest.useFakeTimers();
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
  const { unmount } = render(<CodeBlock language="text">hello</CodeBlock>);
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Copy to clipboard" }));
  });
  const pendingTimers = jest.getTimerCount();
  unmount();
  expect(jest.getTimerCount()).toBe(pendingTimers - 1);
});

it("supports blank text, unknown languages, hidden numbers, and a pure block", () => {
  const { container, rerender } = render(
    <CodeBlock language="unknown" hideLineNumbers>
      {"<script>unsafe()</script>\n"}
    </CodeBlock>,
  );
  expect(container.querySelector("script")).toBeNull();
  expect(container.querySelector("code")).toHaveTextContent(
    "<script>unsafe()</script>",
  );
  expect(
    container.querySelectorAll("[data-geist-code-block-line] button"),
  ).toHaveLength(0);
  rerender(
    <CodeBlock language="text" pure maxHeight={80}>
      {""}
    </CodeBlock>,
  );
  expect(container.firstElementChild.tagName).toBe("PRE");
  expect(container.firstElementChild).toHaveStyle({ maxHeight: "80px" });
  expect(
    container.querySelectorAll("[data-geist-code-block-line]"),
  ).toHaveLength(1);
});

it("creates stable line links, clears other selections, and restores incoming hashes", () => {
  const { container, unmount } = render(
    <>
      <CodeBlock language="js" filename="first.js">
        {source}
      </CodeBlock>
      <CodeBlock language="js" filename="second.js">
        {source}
      </CodeBlock>
    </>,
  );
  const lines = container.querySelectorAll<HTMLElement>(
    "[data-geist-code-block-line]",
  );
  fireEvent.click(lines[0].querySelector("button"));
  expect(window.location.hash).toBe(`#${lines[0].id}`);
  fireEvent.click(lines[4].querySelector("button"));
  expect(lines[0]).not.toHaveAttribute("data-active");
  expect(lines[4]).toHaveAttribute("data-active", "true");
  const id = lines[4].id;
  unmount();
  render(
    <CodeBlock language="js" filename="second.js">
      {source}
    </CodeBlock>,
  );
  expect(document.getElementById(id)).toHaveAttribute("data-active", "true");
  act(() => {
    window.history.replaceState(null, "", "/");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  expect(document.getElementById(id)).not.toHaveAttribute("data-active");
});

function SwitcherExample({ tabbed = false, count = 2 }) {
  const [value, onChange] = useState("js");
  const options = [
    { label: "JavaScript", value: "js" },
    { label: "TypeScript", value: "ts" },
    { label: "Lua", value: "lua" },
    { label: "JSON", value: "json" },
    { label: "Text", value: "text" },
  ].slice(0, count);
  const control = { value, onChange, options };
  return (
    <CodeBlock
      language={value}
      filename={`example.${value}`}
      {...(tabbed ? { tabs: control } : { switcher: control })}
    >
      {value === "js" ? "const count = 1" : "const count: number = 1"}
    </CodeBlock>
  );
}

it("lets the parent control language and content through the select", () => {
  render(<SwitcherExample />);
  fireEvent.change(screen.getByRole("combobox", { name: "Code language" }), {
    target: { value: "ts" },
  });
  expect(screen.getByText("example.ts")).toBeInTheDocument();
  expect(screen.getByRole("combobox")).toHaveValue("ts");
});

it("supports keyboard tab selection and a linked panel", () => {
  render(<SwitcherExample tabbed />);
  fireEvent.keyDown(screen.getByRole("tab", { name: "JavaScript" }), {
    key: "ArrowRight",
  });
  const selected = screen.getByRole("tab", { name: "TypeScript" });
  expect(selected).toHaveFocus();
  expect(selected).toHaveAttribute("aria-selected", "true");
  expect(selected).toHaveAttribute(
    "aria-controls",
    screen.getByRole("tabpanel").id,
  );
  expect(screen.getByRole("tabpanel")).toHaveAttribute(
    "aria-labelledby",
    selected.id,
  );
});

it("uses a select for more than four tabs", () => {
  render(<SwitcherExample tabbed count={5} />);
  expect(screen.queryByRole("tablist")).toBeNull();
  expect(screen.getAllByRole("option")).toHaveLength(5);
});

it("builds v0 links from code without inserting markup", () => {
  render(
    <CodeBlock language="text" v0="build">
      {"a&b#c"}
    </CodeBlock>,
  );
  const link = screen.getByRole("link", { name: "Open in v0" });
  expect(new URL(link.getAttribute("href")).searchParams.get("q")).toContain(
    "a&b#c",
  );
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

it.each([
  ["lua", "local count = 1", "keyword"],
  ["bash", "echo hello", "builtin"],
  ["diff", "+ added\n- removed", "inserted"],
  ["text", "enabled = true", "boolean"],
])("highlights the %s grammar", (language, code, token) => {
  const { container } = render(
    <CodeBlock
      language={language}
      filename={language === "text" ? "settings.toml" : undefined}
    >
      {code}
    </CodeBlock>,
  );
  expect(container.querySelector(`.token.${token}`)).toBeInTheDocument();
});
