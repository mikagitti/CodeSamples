**Web scrape barber waiting time**<br>

The server.js file is the entry point of the application.<br>
It creates an Express server and serves the static files from the public directory.<br>
The `/` route serves the index.html file.<br>
The `/scrape` route uses Puppeteer to scrape the timer text from the target URL.<br>
The `/env` gets stored environment variables. This is used in client to show url for user.<br>
If the element with the class name `.c-timer__time` is found, it extracts the text and sends it to the client.<br>
If this the element is not found, it sends an error message to the client.<br>
<br>

**How to run:**<br>

-    In terminal (or command prompt) execute: `npm install`
-    add '.env' file to root. Copy .env-example context. You can use different port.

-    Start app in terminal (or command prompt) execute: `npm start`
-    Open browser and type: `localhost:3000` or to the port you set.
