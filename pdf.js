const puppeteer = require("puppeteer");

const MY_SERVER = "http://127.0.0.1:5500";
const FILE = "index.html";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${MY_SERVER}/${FILE}`, {
    waitUntil: "networkidle2",
  });

  await page.evaluate(() => {
    const container = document.getElementById("container");
    const footer = document.querySelector("footer");
    if (footer) {
      container.removeChild(footer);
    }
  });

  await page.pdf({
    path: "resume.pdf",
    format: "A4",
    displayHeaderFooter: false,
    printBackground: true,
    // To cut the blank page, if the content is over one page, should remove this property
    pageRanges: "1",
    margin: {
      top: "0.3in",
      bottom: "0.3in",
      left: "0.3in",
      right: "0.3in",
    },
  });

  await browser.close();
})();
