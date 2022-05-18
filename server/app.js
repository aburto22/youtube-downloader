const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const { handleError } = require('./lib');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join('..', '/client/build')));

app.post('/api/youtube/test', (req, res) => {
  setTimeout(() => res.json({ title: 'test', src: 'src' }), 2000);
});

app.post('/api/youtube', (req, res) => {
  const python = spawn('python3', [path.join(__dirname, '..', 'python', 'youtube-downloader.py'), req.body.url]);

  let data = '';

  python.stdout.on('data', (chunk) => {
    data += chunk.toString();
  });

  python.on('close', () => {
    try {
      const json = {
        status: 'success',
        data: JSON.parse(data),
      };

      res.json(json);
    } catch (err) {
      handleError(err, res);
    }
  });

  python.on('error', (err) => {
    handleError(err, res);
  });
});

module.exports = app;
