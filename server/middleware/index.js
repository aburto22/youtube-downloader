const validateUrl = (req, res, next) => {
  const { url } = req.body;

  if (!url) {
    const json = {
      status: 'error',
      code: 400,
      message: 'Missing youtube url.',
    };

    res.send(400).json(json);
    return;
  }

  const youtubeRegex = /(?:https?:\/\/)?(www\.)?youtube\.com\/watch\?(?:.*&)?v=-?[A-Za-z0-9]+(?:&|\b)/;

  if (!youtubeRegex.test(url)) {
    const json = {
      status: 'error',
      code: 400,
      message: 'Youtube url not valid.',
    };

    res.send(400).json(json);
    return;
  }

  next();
};

module.exports = {
  validateUrl,
};
