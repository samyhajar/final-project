const puppeteer = require('puppeteer');
const { resolve } = require('path');

require('dotenv').config();

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const browserWSEndpoint = browser.wsEndpoint();
  console.log(browserWSEndpoint);

  const page = await browser.newPage();

  const url = 'https://www.tages-post.at/start.html';

  await page.goto(url);
  await page.type('#username', process.env.POSTLOGIN);
  await page.type('#password', process.env.POSTPASSWORD);

  const [response] = await Promise.all([
    page.waitForNavigation(),
    await page.click('[type="submit"]'),
  ]);
  console.log(await response);

  // Chooses a file
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click(
      '#files_fineuploader > div > div.qq-upload-button-selector.qq-upload-button > input[type=file]',
    ),
  ]);
  // Chooses a PDF
  await fileChooser.accept([
    '/Users/sam/projects/final-project/pdf/rechnung.pdf',
  ]);

  // awaits for the list of pdf uploaded
  await page.waitForSelector('form#uploaderForm ul > li.qq-upload-success');
  await page.click('#ctrl_submit');

  await page.waitForNavigation();
  // await page.waitForSelector(
  //   'table#table_sort_custom > tbody > tr:first-child > td > input',
  // );
  await page.click(
    'table#table_sort_custom > tbody > tr:first-child > td > input',
  );

  await page.click('#ctrl_printparameter');

  // // await page.waitForNavigation();

  await page.waitForSelector(
    '#table_sort_custom > tbody > tr:nth-child(1) > #address',
  );
  await browser.close();
  await page.waitForSelector('#ctrl_senddocument');
  await page.click('#ctrl_senddocument');

  await page.waitForNavigation();

  await page.click('#paymentform > input[type=submit]:nth-child(10)');

  await page.waitForNavigation();

  await browser.close();
}
main();
