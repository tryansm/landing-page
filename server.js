import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  const file = fs.existsSync(path.join(publicDir, 'index.html'))
    ? path.join(publicDir, 'index.html')
    : path.join(__dirname, 'index.html');
  res.sendFile(file);
});

// Explicit routes ensuring static bundler traceability & fallback serving
app.get('/LP.css', (req, res) => res.sendFile(path.join(__dirname, 'LP.css')));
app.get('/lp.css', (req, res) => res.sendFile(path.join(__dirname, 'lp.css')));
app.get('/LP.js', (req, res) => res.sendFile(path.join(__dirname, 'LP.js')));
app.get('/lp.js', (req, res) => res.sendFile(path.join(__dirname, 'lp.js')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});

export default app;
