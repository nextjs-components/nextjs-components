import React from "react";
import { useState } from "react";
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  EditorProps,
} from "react-live";

import { Container } from "../../components/Container";
import { Details } from "../../components/Details";
import { CopyIcon, RotateCW } from "../../icons";

import { useToasts } from "../../components/Toast";

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

  return (
    <LiveProvider scope={scope} code={code}>
      <div className={styles.live}>
        <Container wrapper>
          <Container className={styles.preview}>
            <LivePreview />
          </Container>
        </Container>

        <div className={styles.editor}>
          <Details summary="Code Editor">
            <div className={styles.editorArea}>
              <LiveEditor
                theme={THEME}
                onChange={setCode}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1em",
                }}
              />
            </div>

            <div className={styles.reset} onClick={handleReset}>
              <RotateCW />
            </div>

            <div className={styles.copy} onClick={handleCopy}>
              <CopyIcon />
            </div>
          </Details>
        </div>
        <LiveError className={styles.error} />
      </div>
    </LiveProvider>
  );
};

export default Editor;
