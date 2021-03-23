function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const puppeteer = require('puppeteer');
  // const IMDB_URL = (movie_id) => `https://www.imdb.com/title/${movie_id}/`;
  // const MOVIE_ID = `tt6763664`;
  
  (async () => {
    /* Initiate the Puppeteer browser */
    let url = 'https://www.flipkart.com/search?q=oppo%20&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off';
    const browser = await puppeteer.launch( {headless:false} );
    const page = await browser.newPage();
  
    /* Go to the IMDB Movie page and wait for it to load */
    await page.goto(url, { waitUntil: 'networkidle0' });
  
    /* Run javascript inside of the page */
    let data = await page.evaluate(() => {
  
      let titleClass = document.querySelectorAll('._4rR01T');
      let productPrice = document.querySelectorAll('._3tbKJL ._1_WHN1');
      let productDescription = document.querySelectorAll('._1xgFaf');
      let titles = [];
      let price = [];
      let description = [];
  
      for(let i = 0; i < titleClass.length; i++) {
        titles.push(titleClass[i].innerHTML);
        price.push(productPrice[i].innerHTML);
        description.push(productDescription[i].innerText);
      }
  
      /* Returning an object filled with the scraped data */
      return {
        titles,
        price,
        description
      }
  
  
    });
  
    /* Outputting what we scraped */
    console.log(data);
    console.log(data.titles.length);
  
    await sleep(5000);
  
    await browser.close();
  })();
  