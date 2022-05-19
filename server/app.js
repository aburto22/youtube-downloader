const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const { handleError } = require('./lib');
const { validateUrl } = require('./middleware');

const app = express();

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join('..', '/client/build')));

app.post('/api/youtube/test', validateUrl, (req, res) => {
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

app.post('/api/youtube/edit', (req, res) => {
  const python = spawn('python3', [
    path.join(__dirname, '..', 'python', 'edit-audio.py'),
    req.body.title,
    req.body.bitrate,
    req.body.start,
    req.body.end,
  ]);

  let data = '';

  python.stdin.write(req.body.base64);
  python.stdin.end();

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
