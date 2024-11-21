import dotenv from "dotenv";
import express from "express";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const TARGET_URL = process.env.TARGET_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/scrape", async (req, res) => {
     console.log("Scraping data...");

     res.setHeader("Content-Type", "text/html"); //Content-Type HTML

     const browserOptions = { headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] };
     const browser = await puppeteer.launch(browserOptions); // headless: false opens a browser window.
     const page = await browser.newPage();

     await page.goto(TARGET_URL, { waitUntil: "networkidle2" });

     try {
          await page.waitForSelector(".c-timer__time", { timeout: 5000 });
          const timerText = await page.$eval(".c-timer__time", (el) => el.innerText);

          if (!timerText) {
               console.log("Element is empty");
               res.send(returnErrorHTML());
               return;
          }

          if (timerText === "Heti") {
               console.log("No one in queue.");
               res.send(returnNowHTML());
               return;
          }

          const returnBlank = returnHTML(timerText);
          res.send(returnBlank);
     } catch (error) {
          console.log("Error during scraping: ", error.message);
          res.send(returnErrorHTML());
     } finally {
          await browser.close();
          console.log("Scraping completed.");
     }
});

app.get("/env", (req, res) => {
     res.json({ TARGET_URL: process.env.TARGET_URL });
});

app.listen(PORT, () => {
     console.log(`Listening port: http://localhost:${PORT}`);
});

function returnNowHTML() {
     return `<p class="blink">Nobody Queues!!!</p>`;
}

function returnHTML(time) {
     return `<p>Queue time: ${time} minutes</p>`;
}

function returnErrorHTML() {
     return `<div class="error">
                <h4>Time Not Found</h4>
             </div>`;
}
