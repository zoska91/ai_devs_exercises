import { PuppeteerWebBaseLoader } from 'langchain/document_loaders/web/puppeteer';

export const scraper = async (url: string) => {
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: {
      headless: 'new',
    },
    gotoOptions: {
      waitUntil: 'domcontentloaded',
    },
  });

  const docs = await loader.load();

  console.log(docs[0].pageContent);

  return docs[0].pageContent;
};
