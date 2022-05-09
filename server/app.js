const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  const python = spawn('py', ['./scripts/youtube-downloader.py', req.body.url]);
  
  let data = '';
  
  python.stdout.on('data', (chunk) => {
    data += chunk.toString();
  });
  
  python.on('close', () => {
    res.json(JSON.parse(data));
  })
  
  python.on('error', (err) => {
    console.error(err);
    res.status(500).json({ error: err });
  });
});

module.exports = app;
