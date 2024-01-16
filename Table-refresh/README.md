**Table with automatic refresh per row.**<br>

Every 5 second refresh row by row. <br>
Every row shows timer when next refresh is going to happend.<br>
One button to stop countdown. And start countdown from the row where it was stopped before.<br>
Lower resolution, like phone, app reduces font size.<br>

Table columns:
- Name: Hard coded name. 
- Number: Random number between 1-10000.
- Time: Current time. And timer.

**How to run:**<br>

- In terminal (or command prompt) execute: `npm install`
- add '.env' file to root. Add this row: `PORT = 4040` or you can type your own port.

- Start app in terminal (or command prompt) execute: `node app.js`
- Browse to port: `localhost:4040`