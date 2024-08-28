# 🐺 QA Wolf Take Home Assignment

Welcome to the QA Wolf take home assignment for our [QA Engineer](https://www.notion.so/qawolf/QA-Wolf-QA-Engineer-Remote-156203a1e476459ea5e6ffca972d0efe) role! We appreciate your interest and look forward to seeing what you come up with.

## Instructions

This assignment has two questions as outlined below. When you are done, send [qa-hiring@qawolf.com](mailto:qa-hiring@qawolf.com) the following:

1. A link to a zip file of this folder on Google Drive

2. A note indicating your work location (Country/State)

3. A note of how you found this job post (LinkedIn, Handshake, Wellfound, referral, etc.)

### Question 1

In this assignment, you will create a script on [Hacker News](https://news.ycombinator.com/) using JavaScript and Microsoft's [Playwright](https://playwright.dev/) framework.

1. Install node modules by running `npm i`.

2. Edit the `index.js` file in this project to go to [Hacker News/newest](https://news.ycombinator.com/newest) and validate that EXACTLY the first 100 articles are sorted from newest to oldest. You can run your script with the `node index.js` command.

Note that you are welcome to update Playwright or install other packages as you see fit, however you must utilize Playwright in this assignment.

### Question 2

Why do you want to work at QA Wolf? Please record a short, ~2 min video that includes:

1. Your answer

2. A walk-through demonstration of your code, showing a successful execution

Post the link in `why_qa_wolf.txt` (Please use [Loom](https://www.loom.com) to record your response). The answer and walkthrough should be combined into _one_ video.

## Frequently Asked Questions

### What is your hiring process? When will I hear about next steps?

This take home assignment is the first step in our hiring process, followed by a final round interview if it goes well. **We review every take home assignment submission and promise to get back to you either way within one week (usually sooner).** The only caveat is if we are out of the office, in which case we will get back to you when we return. If it has been more than one week and you have not heard from us, please do follow up.

The final round interview is a 2-hour technical work session that reflects what it is like to work here. We provide a $150 stipend for your time for the final round interview regardless of how it goes. After that, there may be a short chat with our director about your experience and the role.

Our hiring process is rolling where we review candidates until we have filled our openings. If there are no openings left, we will keep your contact information on file and reach out when we are hiring again.

### How do you decide who to hire?

We evaluate candidates based on three criteria:

- Technical ability (as demonstrated in the take home and final round)
- Customer service orientation (as this role is customer facing)
- Alignment with our values (captured [here](https://www.notion.so/qawolf/QA-Wolf-QA-Engineer-Remote-156203a1e476459ea5e6ffca972d0efe))

This means whether we hire you is based on how you do during our interview process, not on your previous experience (or lack thereof). Note that you will also need to pass a background check to work here as our customers require this.

# QA Wolf E2E Test Suite

## Project Overview

This project contains a suite of end-to-end tests for the Hacker News website. It utilizes Playwright for browser automation, with support for rotating proxies and different browser environments.

## Prerequisites

- Node.js v14 or higher
- NPM or Yarn
- A set of proxies and credentials for testing

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/QA_Wolf_E2E.git
   cd QA_Wolf_E2E
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file at the root of the project with the following contents:

   ```env
   PROXY_USERNAME=your_proxy_username
   PROXY_PASSWORD=your_proxy_password
   LOG_LEVEL=info
   COOLDOWN_DURATION=30000
   ROTATION_THRESHOLD=5
   MAX_RETRIES=3
   BASE_URL=https://news.ycombinator.com
   SCRAPE_COUNT=100
   ```

4. Add your IPs and User Agents to `ips.json` and `userAgents.json` in the `config/` directory.

## Running Tests

To run the tests, use the following command:

```sh
npx playwright test
```
