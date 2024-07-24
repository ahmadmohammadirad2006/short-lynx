const express = require('express');
const path = require('path');
const app = express();

const Url = require('./models/urlModel');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const urlRouter = require('./routes/urlRouter');

// Body-parser
app.use(express.json());

// Server static files in public
app.use(express.static('public'));

// redirect shortened urls
app.get('/shortened/:id', async (req, res, next) => {
  const url = await Url.findById(req.params.id);

  if (!url) return next(new AppError('No url found with that ID', 400));

  res.redirect(`${url.address}`);
});

app.get('/', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname), 'public/index.html');
});

// Routes
app.use('/api/v1/urls', urlRouter);

// handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.url} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
