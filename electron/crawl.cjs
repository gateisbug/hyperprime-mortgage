const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

let browser = null;
let page = null;

// const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const TARGET =
  'div#block-basic-content div#etf-reports-fund div#tabs div.fund-overview-factset__wrapper';

async function init() {
  // noinspection JSCheckFunctionSignatures
  browser = await puppeteer.launch({
    headless: "new",
    executablePath: EDGE_PATH,
  });
  page = await browser.newPage();
}

async function search(link) {
  if (!browser || !page) {
    console.error(new Error('puppeteer is not init'));
    return false;
  }

  try {
    await page.goto(link);
    await page.waitForSelector(TARGET, {
      timeout: 15000,
    });
    return true;
  } catch (e) {
    throw e;
  }
}

async function screenshot(name = 'test') {
  if (!browser || !page) {
    console.error(new Error('puppeteer is not init'));
    return;
  }

  await page.screenshot({
    path: `./${name}.png`,
    fullPage: true,
    type: 'png',
  });
}

async function getInsight() {
  let data = await page.$(TARGET);
  return await page.evaluate((element) => {
    return element.innerText;
  }, data);
}

async function close() {
  await browser.close();
  browser = null;
  page = null;
}

// const modules = {
//   init,
//   close,
//   search,
//   screenshot,
//   getInsight,
// };

module.exports = {
  init,
  close,
  search,
  screenshot,
  getInsight,
};
