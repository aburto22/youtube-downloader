const handleError = (err, res) => {
  console.error(err);

  const json = {
    status: 'error',
    code: 500,
    message: 'There was an error with your request, check youtube url and try again.',
  };

  res.status(500).json(json);
};

module.exports = {
  handleError,
};
