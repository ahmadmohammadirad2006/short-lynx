const express = require('express');

const app = express();

const Url = require('./models/urlModel');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const urlRouter = require('./routes/urlRouter');

app.use(express.json());

app.get('/shortened/:id', async (req, res, next) => {
  const url = await Url.findById(req.params.id);

  if (!url) return next(new AppError('No url found with that ID', 400));

  res.redirect(`${url.address}`);
});

app.use('/api/v1/urls', urlRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.url} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
