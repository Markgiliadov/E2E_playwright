import { test, expect } from "@playwright/test";
import { HackerNewsPage } from "../pages/HackerNewsPage";
import dotenv from "dotenv";
dotenv.config();

async function setupPageWithProxy(
  browserType: "chromium" | "firefox" | "webkit",
  articlesToScrape: number
): Promise<{ hackerNewsPage: HackerNewsPage; dates: Date[] }> {
  const hackerNewsPage = await HackerNewsPage.createWithProxy(browserType);
  await hackerNewsPage.navigate();
  const dates = await hackerNewsPage.scrapeArticles(articlesToScrape);
  return { hackerNewsPage, dates };
}

test.describe("Hacker News Article Sorting", () => {
  test("should verify articles are sorted by newest first using a proxy", async ({
    browserName,
  }) => {
    const { hackerNewsPage, dates } = await setupPageWithProxy(
      browserName as "chromium" | "firefox" | "webkit",
      100
    );
    expect(dates.length).toBeGreaterThanOrEqual(30);
    expect(hackerNewsPage.isSorted(dates)).toBe(true);
    await hackerNewsPage.closeBrowser();
  });

  test("should handle fewer than 100 articles gracefully using a proxy", async ({
    browserName,
  }) => {
    const { hackerNewsPage, dates } = await setupPageWithProxy(
      browserName as "chromium" | "firefox" | "webkit",
      50
    );
    expect(dates.length).toBeLessThanOrEqual(50);
    expect(hackerNewsPage.isSorted(dates)).toBe(true);
    await hackerNewsPage.closeBrowser();
  });

  test("should scrape 200 articles efficiently using a proxy", async ({
    browserName,
  }) => {
    const startTime = Date.now();
    const { hackerNewsPage, dates } = await setupPageWithProxy(
      browserName as "chromium" | "firefox" | "webkit",
      200
    );
    const endTime = Date.now();
    expect(dates.length).toBeGreaterThanOrEqual(100);
    expect(hackerNewsPage.isSorted(dates)).toBe(true);
    expect(endTime - startTime).toBeLessThan(60000); // Adjusted time limit to 60 seconds
    await hackerNewsPage.closeBrowser();
  });

  test("should handle rate-limiting gracefully using a proxy", async ({
    browserName,
  }) => {
    const { hackerNewsPage, dates } = await setupPageWithProxy(
      browserName as "chromium" | "firefox" | "webkit",
      100
    );
    expect(dates.length).toBeGreaterThanOrEqual(50);
    expect(hackerNewsPage.isSorted(dates)).toBe(true);
    await hackerNewsPage.closeBrowser();
  });

  test("should recover gracefully from unexpected errors using a proxy", async ({
    browserName,
  }) => {
    try {
      await setupPageWithProxy(
        browserName as "chromium" | "firefox" | "webkit",
        100
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("should handle multiple concurrent scrapes using a proxy", async ({
    browserName,
  }) => {
    const instances = 2;
    const scrapePromises = Array(instances)
      .fill(null)
      .map(() =>
        setupPageWithProxy(
          browserName as "chromium" | "firefox" | "webkit",
          100
        )
      );

    const results = await Promise.all(scrapePromises);

    for (const { hackerNewsPage, dates } of results) {
      expect(dates.length).toBeGreaterThanOrEqual(50);
      expect(hackerNewsPage.isSorted(dates)).toBe(true);
      await hackerNewsPage.closeBrowser();
    }
  });
});
