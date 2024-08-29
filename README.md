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

├── .github/
│ └── workflows/
│ └── playwright.yml # GitHub Actions workflow for CI/CD
├── pages/
│ └── HackerNewsPage.ts # Page Object Model for Hacker News
├── tests/
│ └── hackerNews.test.ts # Test suite for Hacker News article sorting
├── utils/
│ ├── IPManager.ts # Utility for managing proxy IPs
│ ├── logger.ts # Logger configuration
│ └── config.ts # Configuration management
├── config/
│ ├── ips.json # Proxy IP configuration file
│ ├── userAgents.json # User-Agent strings configuration file
├── .gitignore # Git ignored files
├── README.md # Project documentation
├── package.json # Project dependencies and scripts
├── playwright.config.ts # Playwright configuration
└── tsconfig.json # TypeScript configuration

## Setup Instructions

1. **Clone the repository**:
   git clone https://github.com/yourusername/qa-wolf-e2e-playwright.git
   cd qa-wolf-e2e-playwright

2. **Install dependencies**:
   npm install

3. **Create configuration files**:
   In the \`./src/config/\` directory, create two files: \`ips.json\` and \`userAgents.json\`.

   **ips.json**:
   {
   "proxies": [
   { "server": "your_proxy_server_1", "ip": "your_ip_1" },
   { "server": "your_proxy_server_2", "ip": "your_ip_2" }
   ...
   ]
   }

   **userAgents.json**:
   {
   "userAgents": [
   "User-Agent String 1",
   "User-Agent String 2"
   ...
   ]
   }

4. **Run the tests**:
   npx playwright test

5. **View the reports**:
   After running the tests, reports and traces will be generated in the \`test-results/\` directory.

## CI/CD with GitHub Actions

The project is configured to run tests on GitHub Actions. The workflow file is located at \`.github/workflows/playwright.yml\`. It runs the tests on every push and pull request across multiple browsers.

## Environment Variables

Ensure the following environment variables are set in your GitHub Actions secrets or locally for testing:

- \`PROXY_USERNAME\`: Your proxy username
- \`PROXY_PASSWORD\`: Your proxy password
- \`IPS_JSON\`: The JSON content of your IP configuration
- \`USER_AGENTS_JSON\`: The JSON content of your User-Agent configuration

## Contribution Guidelines

Feel free to open issues or submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
