"use client";

import { useTheme } from "nextjs-components/src/contexts/ThemeContext";
import { Monitor, Moon, Sun } from "nextjs-components/src/icons";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };
  const isChecked = (value: string) => theme === value;

  return (
    <div className="flex h-9 rounded-full border-[1px] border-solid border-[--accents-2] bg-[--accents-1] p-[3px]">
      <span style={{ height: "100%" }}>
        <input
          className="peer/system absolute m-0 appearance-none p-0 outline-none"
          type="radio"
          id="theme-switcher-system"
          value="system"
          onChange={handleChange}
          checked={isChecked("system")}
        />
        <label
          className={
            "relative m-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-none transition-all duration-100 ease-in-out" +
            " " +
            "hover:bg-[--accents-1]" +
            " " +
            "peer-checked/system:bg-[#fff] peer-checked/system:shadow-theme-switcher-label dark:peer-checked/system:bg-[--accents-2]" +
            " " +
            "[&_svg]:relative [&_svg]:z-[1] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:!text-[--accents-5] [&_svg]:transition-colors [&_svg]:duration-100 [&_svg]:ease-in-out" +
            " " +
            "hover:[&_svg]:!text-[--accents-8] peer-checked/system:[&_svg]:!text-[--accents-8]"
          }
          htmlFor="theme-switcher-system"
          aria-label="Switch to system mode"
          title="Switch to system mode"
        >
          <Monitor size={16} />
        </label>
      </span>
      <span style={{ height: "100%" }}>
        <input
          className="peer/dark absolute m-0 appearance-none p-0 outline-none"
          type="radio"
          id="theme-switcher-dark"
          value="dark"
          onChange={handleChange}
          checked={isChecked("dark")}
        />
        <label
          className={
            "relative m-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-none transition-all duration-100 ease-in-out" +
            " " +
            "hover:bg-[--accents-1]" +
            " " +
            "peer-checked/dark:bg-[#fff] peer-checked/dark:shadow-theme-switcher-label dark:peer-checked/dark:bg-[--accents-2]" +
            " " +
            "[&_svg]:relative [&_svg]:z-[1] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:!text-[--accents-5] [&_svg]:transition-colors [&_svg]:duration-100 [&_svg]:ease-in-out" +
            " " +
            "hover:[&_svg]:!text-[--accents-8] peer-checked/dark:[&_svg]:!text-[--accents-8]"
          }
          htmlFor="theme-switcher-dark"
          aria-label="Switch to dark mode"
          title="Switch to dark mode"
        >
          <Moon size={16} />
        </label>
      </span>
      <span style={{ height: "100%" }}>
        <input
          className="peer/light absolute m-0 appearance-none p-0 outline-none"
          type="radio"
          id="theme-switcher-light"
          value="light"
          onChange={handleChange}
          checked={isChecked("light")}
        />
        <label
          className={
            "relative m-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-none transition-all duration-100 ease-in-out" +
            " " +
            "hover:bg-[--accents-1]" +
            " " +
            "peer-checked/light:bg-[#fff] peer-checked/light:shadow-theme-switcher-label dark:peer-checked/light:bg-[--accents-2]" +
            " " +
            "[&_svg]:relative [&_svg]:z-[1] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:!text-[--accents-5] [&_svg]:transition-colors [&_svg]:duration-100 [&_svg]:ease-in-out" +
            " " +
            "hover:[&_svg]:!text-[--accents-8] peer-checked/light:[&_svg]:!text-[--accents-8]"
          }
          htmlFor="theme-switcher-light"
          aria-label="Switch to light mode"
          title="Switch to light mode"
        >
          <Sun size={16} />
        </label>
      </span>
    </div>
  );
};
