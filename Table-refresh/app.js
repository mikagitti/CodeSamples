
import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const app = express();

dotenv.config();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  
});

app.use((req, res, next) => {
  res.status(404).send('<p style="font-size: 20px; font-weight: bolder; color: red;">Address does not exist!</p><div style="font-size: 20px; "><a href="/">BACK HOME</a></div>');
});

app.listen(port, () => {
  console.log(`Listening PORT: ${port}`);
});

