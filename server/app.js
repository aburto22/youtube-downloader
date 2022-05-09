const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join('..', '/client/build')));

app.post('/api/youtube', (req, res) => {
  const python = spawn('python', ['./scripts/youtube-downloader.py', req.body.url]);
  
  let data = '';
  
  python.stdout.on('data', (chunk) => {
    data += chunk.toString();
  });
  
  python.on('close', () => {
    console.log(data);
    res.json(JSON.parse(data));
  });
  
  python.on('error', (err) => {
    console.error(err);
    res.status(500).json({ error: err });
  });
});

module.exports = app;
