const puppeteer = require('puppeteer');
const { resolve } = require('path');

require('dotenv').config();

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  const url = 'https://www.tages-post.at/start.html';
  console.log(process.env.POSTLOGIN);
  await page.goto(url);
  await page.type('#username', process.env.POSTLOGIN);
  await page.type('#password', process.env.POSTPASSWORD);

  const [response] = await Promise.all([
    page.waitForNavigation(),
    await page.click('[type="submit"]'),
  ]);
  console.log(await response);
  // await page.click('[type="submit"]');

  // await page.once('load', () => console.log('page.loaded'));
  // await page.click(
  //   '#files_fineuploader > div > div.qq-upload-button-selector.qq-upload-button > input[type=file]',
  // );

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

  await page.waitForSelector(
    'table#table_sort_custom > tbody > tr:first-child > td > input',
  );
  await page.click(
    'table#table_sort_custom > tbody > tr:first-child > td > input',
  );

  await page.click('#ctrl_printparameter');

  await page.waitForNavigation();

  await page.waitForSelector(
    '#table_sort_custom > tbody > tr:nth-child(1) > td:nth-child(3)',
  );
  // const element = await page.$(
  //   '#table_sort_custom > tbody > tr:nth-child(1) > td:nth-child(3)',
  // );
  // const value = await page.evaluate((el) => el.textContent, element);
  // console.log(value);
  // await page.type('#ctrl_title', 'Ausland');

  // await page.waitForNavigation();
  // await page.click('#ctrl_save');

  // await page.waitForNavigation();
  await page.click('#ctrl_senddocument');

  await page.waitForNavigation();

  await page.click('[type="submit"]');
}
main();
