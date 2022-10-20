import { type PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  testDir: "./e2e",
  use: {
    trace: "on-first-retry",
    baseURL: "http://localhost:3000",
  },
  timeout: 5000,
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    cwd: "./e2e",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], headless: true },
    },
  ],
};

export default config;
