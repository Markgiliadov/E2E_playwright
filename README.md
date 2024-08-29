# QA Wolf E2E Playwright Project

## Overview

This project is an end-to-end (E2E) testing suite built using Playwright. It is designed to automate the process of validating that articles on the Hacker News website are sorted correctly and handle various edge cases like rate-limiting, IP rotation, and scraping a large number of articles. The project is structured using the Page Object Model (POM) to promote maintainability and scalability.

## Features

- **Multi-browser testing**: The suite runs on Chromium, Firefox, and WebKit.
- **Proxy IP Rotation**: Automatically rotates IPs to avoid rate-limiting during scraping.
- **User-Agent Randomization**: Changes the User-Agent string for each request to mimic real user behavior.
- **CI/CD Integration**: Configured to run tests on GitHub Actions with full logging and artifact uploads.
- **Error Handling**: Gracefully handles errors like rate-limiting and unexpected page crashes.
- **Reporting**: Generates detailed reports and traces for debugging.

## Project Structure

```plaintext
├── .github/
│   └── workflows/
│       └── playwright.yml     # GitHub Actions workflow for CI/CD
├── pages/
│   └── HackerNewsPage.ts      # Page Object Model for Hacker News
├── tests/
│   └── hackerNews.test.ts     # Test suite for Hacker News article sorting
├── utils/
│   ├── IPManager.ts           # Utility for managing proxy IPs
│   ├── logger.ts              # Logger configuration
│   └── config.ts              # Configuration management
├── config/
│   ├── ips.json               # Proxy IP configuration file
│   ├── userAgents.json        # User-Agent strings configuration file
├── .gitignore                 # Git ignored files
├── README.md                  # Project documentation
├── package.json               # Project dependencies and scripts
├── playwright.config.ts       # Playwright configuration
└── tsconfig.json              # TypeScript configuration
```
