import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";

import { getContrast } from "../../utils/getContrast";
import { useToasts } from "../Toast";

import { Color } from "../../styles/Color";
import { useTheme } from "../../contexts/ThemeContext";

function componentToHex(c: string) {
  const hex = parseInt(c, 10).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getRGB(elem: HTMLElement): [string, string, string] | [] {
  if (typeof window === "undefined") return [];
  if (!elem) return [];
  return (
    (getComputedStyle(elem, null)
      ?.getPropertyValue("background-color")
      ?.replace(/[^\d,]/g, "")
      ?.split(",") as [string, string, string]) ?? []
  );
}

const ColorCard = ({ color }: { color: Color }) => {
  const varColor = `var(${color})`;
  const toasts = useToasts();
  const { mode } = useTheme();

  const ref = useRef();
  const [hex, setHex] = useState("");

  useEffect(() => {
    // timeout is a hack
    const timer = setTimeout(() => {
      const [r, g, b] = getRGB(ref.current);
      setHex(rgbToHex(r, g, b));
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [ref.current, mode]);

  return (
    <div ref={ref} className={"colorcard"}>
      <div>
        <span
          className={"card_snippet"}
          aria-label="Copy text to clipboard"
          onClick={() => {
            navigator.clipboard.writeText(varColor);
            toasts.current?.success({
              text: `Copied \`${varColor}\` to clipboard!`,
            });
          }}
        >
          <p className={clsx("geist-text", "geist-text-mono")}>{varColor}</p>
        </span>
      </div>
      <div>
        <span
          className={"card_snippet"}
          aria-label="Copy text to clipboard"
          onClick={() => {
            navigator.clipboard.writeText(hex.toUpperCase());
            toasts.current?.success({
              text: `Copied \`${hex.toUpperCase()}\` to clipboard!`,
            });
          }}
        >
          <p className={clsx("geist-text", "geist-text-mono")}>
            {hex.toUpperCase()}
          </p>
        </span>
      </div>
      <style jsx>{`
        .colorcard {
          font-size: 14px;
          color: ${getContrast(hex)};
          background: var(${color});
          padding: var(--geist-gap);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .colorcard:first-of-type {
          border-top-left-radius: calc(var(--geist-radius) - 1px);
          border-top-right-radius: calc(var(--geist-radius) - 1px);
        }
        .colorcard:last-of-type {
          border-bottom-left-radius: calc(var(--geist-radius) - 1px);
          border-bottom-right-radius: calc(var(--geist-radius) - 1px);
        }
        .card_snippet {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1rem;
          border-radius: var(--geist-radius);
          transition: background 0.2s ease, color 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default ColorCard;
