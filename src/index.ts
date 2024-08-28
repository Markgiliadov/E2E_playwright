// // runScraper.ts
// import { chromium } from "playwright";
// import { HackerNewsPage } from "./pages/HackerNewsPage";
// import { mockHackerNewsAPI } from "./tests/__mocks__/apiMocks";

// (async () => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   // Uncomment the following line to use mocked data instead of real website
//   // mockHackerNewsAPI(page, 100);

//   const hackerNewsPage = new HackerNewsPage(page);
//   await hackerNewsPage.navigate();

//   try {
//     const dates = await hackerNewsPage.scrapeArticles(100);
//     console.log(`Successfully scraped ${dates.length} articles.`);

//     const isSorted = hackerNewsPage.isSorted(dates);
//     console.log(
//       isSorted
//         ? "Articles are sorted from newest to oldest."
//         : "Articles are not sorted correctly."
//     );
//   } catch (error) {
//     console.error("An error occurred:", error);
//   } finally {
//     await browser.close();
//   }
// })();
