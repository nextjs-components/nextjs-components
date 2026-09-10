"use client";

import * as All from "nextjs-components";
import { CodeBlock } from "nextjs-components/src/components/CodeBlock";
import { Container } from "nextjs-components/src/components/Container";
import ChevronRight from "nextjs-components/src/icons/chevron-right";
import { useId, useState } from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";

import { editorScope } from "@/app/design/(foundations)/icons/icon-map";

import styles from "./editor.module.css";

const DEFAULT_CODE = `<div>Hello, world!</div>`;
type EditorProps = { scope?: Record<string, unknown>; code?: string };

const Editor = ({ scope, code = DEFAULT_CODE }: EditorProps) => {
  const [open, setOpen] = useState(false);
  const editorId = useId();
  return (
    <LiveProvider
      scope={{ ...All, ...editorScope, ...scope }}
      code={code}
      language="tsx"
    >
      <div className={styles.live}>
        <Container wrapper>
          <Container className={styles.preview}>
            <LivePreview />
          </Container>
        </Container>
        <button
          type="button"
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={editorId}
          onClick={() => setOpen(!open)}
        >
          <ChevronRight
            size={16}
            style={{ transform: `rotate(${open ? 90 : 0}deg)` }}
          />
          <span>Code</span>
        </button>
        <div id={editorId} hidden={!open}>
          {open && (
            <CodeBlock
              id={editorId + "-code"}
              className={styles.codeBlock}
              language="tsx"
            >
              {code}
            </CodeBlock>
          )}
        </div>
        <LiveError className={styles.error} />
      </div>
    </LiveProvider>
  );
};
export default Editor;
