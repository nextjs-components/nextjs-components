// jest.config.ts
import type { Config } from "@jest/types";

/**
 * @see https://jestjs.io/docs/configuration
 */
export default async (): Promise<Config.InitialOptions> => {
  return {
    testEnvironment: "jsdom", // mock document & window
    moduleDirectories: ["src", "node_modules"],
    testPathIgnorePatterns: ["dist", "node_modules"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    transform: {
      "^.+\\.tsx?$": ["babel-jest", { presets: ["next/babel"] }],
      ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
    },
  };
};
