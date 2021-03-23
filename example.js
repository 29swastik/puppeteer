const puppeteer = require('puppeteer');
// const IMDB_URL = (movie_id) => `https://www.imdb.com/title/${movie_id}/`;
// const MOVIE_ID = `tt6763664`;

(async () => {
  /* Initiate the Puppeteer browser */
  let url = 'https://www.flipkart.com/oppo-f19-pro-fluid-black-128-gb/p/itmf3153ba8dbf1a?pid=MOBGYV9VCE8G2SDV&lid=LSTMOBGYV9VCE8G2SDVKROOXV&marketplace=FLIPKART&q=oppo+&store=tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=SEARCH&iid=44adc710-17ca-4a73-b331-c6d6658cfed3.MOBGYV9VCE8G2SDV.SEARCH&ppt=sp&ppn=sp&ssid=ux3pvux5rk0000001616478538251&qH=63f7e4df5c9ea040';
  const browser = await puppeteer.launch( {headless:false} );
  const page = await browser.newPage();

  /* Go to the IMDB Movie page and wait for it to load */
  await page.goto(url, { waitUntil: 'networkidle0' });

  /* Run javascript inside of the page */
  let data = await page.evaluate(() => {

    let title = document.querySelector('span[class = "B_NuCI"]').innerText;
    let rating = document.querySelector('div[class = "_3LWZlK"]').innerText;
    let ratingCount = document.querySelector('span[class = "_2_R_DZ"] > span > span').innerText;
    let reviewCount = document.querySelector('span[class = "_13vcmD"] ~ span').innerText;

    /* Returning an object filled with the scraped data */
    return {
      title,
      rating,
      ratingCount,
      reviewCount
    }

  });

  /* Outputting what we scraped */
  console.log(data);

  await browser.close();
})();