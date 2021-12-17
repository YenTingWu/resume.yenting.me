const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://127.0.0.1:5500/index.html", {
    waitUntil: "networkidle2",
  });

  await wait();

  await page.pdf({
    path: "resume.pdf",
    format: "A4",
    displayHeaderFooter: false,
    printBackground: true,
    margin: {
      top: "0.3in",
      bottom: "0.3in",
      left: "0.3in",
      right: "0.3in",
    },
  });

  await browser.close();
})();

const wait = async () =>
  new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
