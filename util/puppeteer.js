const puppeteer = require('puppeteer');
const { resolve } = require('path');

require('dotenv').config({ path: resolve(__dirname, '../util/.env') });

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  const url = 'https://www.tages-post.at/start.html';

  await page.goto(url);
  await page.type('#username', process.env.POST_LOGIN);
  await page.type('#password', process.env.POST_PASSWORD);

  // click and wait for navigation

  await page.click('[type="submit"]');
  await page.waitForNavigation(); // <------------------------- Wait for Navigation

  // Chooses a file
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('input[type=file]'),
  ]);
  // Chooses a PDF
  await fileChooser.accept([
    '/Users/sam/projects/final-project/pdf/rechnung.pdf',
  ]);

  // awaits for the list of pdf uploaded
  await page.waitForSelector('form#uploaderForm ul > li.qq-upload-success');
  await page.click('#ctrl_submit');

  await page.waitForSelector(
    'table#table_sort_custom > tbody > tr:first-child > td > input',
  );
  await page.click(
    'table#table_sort_custom > tbody > tr:first-child > td > input',
  );

  await page.click('#ctrl_printparameter');

  await page.waitForNavigation();
  // await page.type('#ctrl_title', 'Ausland');

  // await page.waitForNavigation();
  // await page.click('#ctrl_save');

  // await page.waitForNavigation();
  await page.click('#ctrl_senddocument');

  await page.waitForNavigation();

  await page.click('[type="submit"]');
}

main();
