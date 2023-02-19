import { Button } from "nextjs-components/src/components/Button";
import { Container } from "nextjs-components/src/components/Container";
import { Text } from "nextjs-components/src/components/Text";
import { useToasts } from "nextjs-components/src/components/Toast";
import CopyIcon from "nextjs-components/src/icons/CopyIcon";
import RotateCW from "nextjs-components/src/icons/RotateCW";
import React from "react";
import { useState } from "react";
import {
  EditorProps,
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from "react-live";

import styles from "./editor.module.css";

const DEFAULT_CODE = `
<div>Hello, world!</div>
`;

const THEME: EditorProps["theme"] = {
  plain: {
    backgroundColor: "var(--geist-background)",
    color: "var(--geist-foreground)",
  },
  styles: [
    {
      style: { color: "var(--accents-3)" },
      types: ["comment"],
    },
    {
      style: { color: "var(--accents-4)" },
      types: ["string", "number", "builtin", "variable"],
    },
    {
      style: { color: "var(--accents-6)" },
      types: ["class-name", "function", "tag", "attr-name"],
    },
  ],
};

const Editor = ({ scope, code: codeInit = DEFAULT_CODE }) => {
  const toast = useToasts();
  const [code, setCode] = useState(codeInit);

  const handleReset = () => {
    setCode(codeInit);
    toast.current?.message({ text: "The editor has been reset." });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.current?.success({ text: "Copied to clipboard!" });
  };

  const [open, setOpen] = useState(false);

  return (
    <LiveProvider scope={scope} code={code}>
      <div className={styles.live}>
        <Container wrapper>
          <Container className={styles.preview}>
            <LivePreview />
          </Container>
        </Container>

        <div className={styles.editor}>
          <div className={styles.editorTrigger} onClick={() => setOpen(!open)}>
            <svg
              data-testid="geist-icon"
              fill="none"
              height="16"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="16"
              style={{
                transition: "transform 200ms",
                transform: `rotate(${open ? 90 : 0}deg)`,
                color: "var(--accents-6)",
              }}
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
            <Text
              style={{
                "--color": "var(--accents-6)",
                marginLeft: 6,
              }}
            >
              Code Editor
            </Text>

            <div className={styles.actions}>
              <Button
                shape="square"
                type="secondary"
                className={styles.reset}
                onClick={handleReset}
                variant="ghost"
              >
                <RotateCW size={16} />
              </Button>

              <Button
                shape="square"
                type="secondary"
                className={styles.copy}
                onClick={handleCopy}
                variant="ghost"
              >
                <CopyIcon size={16} />
              </Button>
            </div>
          </div>
        </div>

        {open ? (
          <div className={styles.editorArea}>
            <LiveEditor
              theme={THEME}
              onChange={setCode}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1em",
                // 14 + inner 10 = var(--geist-gap) (24)
                padding: 14,
              }}
            />
          </div>
        ) : null}
        <LiveError className={styles.error} />
      </div>
    </LiveProvider>
  );
};

export default Editor;
