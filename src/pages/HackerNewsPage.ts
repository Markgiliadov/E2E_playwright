import {
  Page,
  BrowserContext,
  chromium,
  firefox,
  webkit,
} from "@playwright/test";
import { ipManager } from "../utils/IPManager";
import { getConfig } from "../config/config";
import { logger } from "../utils/logger";

export class HackerNewsPage {
  private page: Page;
  private context: BrowserContext;
  private browserType: "chromium" | "firefox" | "webkit";
  private moreButtonSelector = "a.morelink";
  private rateLimitSelector = "a[href='javascript:window.location.reload();']";
  private ageSelector = "span.age";
  private config = getConfig();

  constructor(
    page: Page,
    context: BrowserContext,
    browserType: "chromium" | "firefox" | "webkit"
  ) {
    this.page = page;
    this.context = context;
    this.browserType = browserType;
    logger.info(`Initialized HackerNewsPage with ${browserType}`);
  }

  static async createWithProxy(
    browserType: "chromium" | "firefox" | "webkit"
  ): Promise<HackerNewsPage> {
    const { page, context } = await HackerNewsPage.createBrowserWithNewIP(
      browserType
    );
    return new HackerNewsPage(page, context, browserType);
  }

  static async createBrowserWithNewIP(
    browserType: "chromium" | "firefox" | "webkit"
  ) {
    const config = getConfig();
    const randomProxy = ipManager.getIP();
    if (!randomProxy) {
      throw new Error("No available proxies. All are in cooldown.");
    }

    logger.info(
      `Using IP: ${randomProxy.ip} through proxy server: ${randomProxy.server}`
    );

    const launchOptions = {
      proxy: {
        server: randomProxy.server,
        username: config.proxyCredentials.username,
        password: config.proxyCredentials.password,
      },
    };

    const browser =
      browserType === "chromium"
        ? await chromium.launch(launchOptions)
        : browserType === "firefox"
        ? await firefox.launch(launchOptions)
        : await webkit.launch(launchOptions);

    const context = await browser.newContext({
      userAgent: HackerNewsPage.getRandomUserAgent(),
    });
    const page = await context.newPage();
    logger.info(`Launched browser with new IP: ${randomProxy.ip}`);
    return { page, context };
  }

  static getRandomUserAgent(): string {
    const config = getConfig();
    const selectedUserAgent =
      config.userAgents[Math.floor(Math.random() * config.userAgents.length)];
    logger.info(`Selected User-Agent: ${selectedUserAgent}`);
    return selectedUserAgent;
  }

  async navigate(
    url: string = process.env.BASE_URL || "https://news.ycombinator.com/newest"
  ) {
    logger.info(`Navigating to URL: ${url}`);
    await this.page.goto(url, { waitUntil: "networkidle" });
  }

  async scrapeArticles(numArticles: number): Promise<Date[]> {
    const collectedDates: Date[] = [];
    let pagesScraped = 0;
    let retries = 0;

    while (collectedDates.length < numArticles) {
      if (
        pagesScraped > 0 &&
        pagesScraped % this.config.rotationThreshold === 0
      ) {
        logger.info(
          `Rotating IP after scraping ${pagesScraped} pages to avoid rate-limiting...`
        );
        const currentUrl = this.page.url();

        await this.context.close();
        const { page, context } = await HackerNewsPage.createBrowserWithNewIP(
          this.browserType
        );
        this.page = page;
        this.context = context;

        await this.navigate(currentUrl);
      }

      try {
        if (await this.page.isVisible(this.rateLimitSelector)) {
          logger.warn("Rate limit detected. Reloading page...");
          await this.page.click(this.rateLimitSelector);
          await this.page.waitForLoadState("networkidle");
          continue;
        }

        const newDates = await this.page.$$eval(this.ageSelector, (elements) =>
          elements
            .map((el) => el.getAttribute("title"))
            .filter((dateStr): dateStr is string => !!dateStr)
            .map((dateStr) => new Date(dateStr))
            .filter((date) => !isNaN(date.getTime()))
        );

        collectedDates.push(...newDates);

        if (collectedDates.length >= numArticles) {
          break;
        }

        const moreButton = await this.page.$(this.moreButtonSelector);
        if (!moreButton) {
          logger.warn(
            "No more pages available. Collected all available articles."
          );
          break;
        }

        await moreButton.click();

        pagesScraped += 1;
        retries = 0;
      } catch (error) {
        logger.error("Error during scraping:", error);

        if (retries < this.config.maxRetries) {
          retries += 1;
          logger.warn(`Retrying scraping due to error... Attempt ${retries}`);
        } else {
          logger.error(
            `Max retries reached. Rotating IP and retrying with a new proxy.`
          );
          const currentUrl = this.page.url();
          await this.context.close();
          const { page, context } = await HackerNewsPage.createBrowserWithNewIP(
            this.browserType
          );
          this.page = page;
          this.context = context;
          await this.navigate(currentUrl);
          retries = 0;
        }
      }
    }

    return collectedDates.slice(0, numArticles);
  }

  isSorted(dates: Date[]): boolean {
    for (let i = 1; i < dates.length; i++) {
      if (dates[i - 1] < dates[i]) {
        return false;
      }
    }
    return true;
  }

  async closeBrowser() {
    await this.context.close();
  }
}
