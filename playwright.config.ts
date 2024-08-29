// playwright.config.ts

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests", // Specifies the directory containing test files
  fullyParallel: true,
  timeout: 180000, // Maximum time one test can run (60 seconds)
  // retries: 1, // Number of retries for failed tests
  workers: 16, // Number of parallel workers; adjust based on your machine's capabilities
  use: {
    trace: "on-first-retry", // Capture trace only on the first retry
    headless: true, // Run tests in headless mode for better performance
    screenshot: "only-on-failure", // Capture screenshots only when a test fails
    video: "retain-on-failure", // Record video only when a test fails
  },
  projects: [
    {
      name: "Chromium",
      use: {
        ...devices["Desktop Chrome"],
      }, // Uses desktop Chrome for testing
    },
    {
      name: "Firefox",
      use: {
        ...devices["Desktop Firefox"],
      }, // Uses desktop Firefox for testing
    },
    {
      name: "WebKit",
      use: {
        ...devices["Desktop Safari"],
      }, // Uses desktop Safari for testing
    },
  ],
});
