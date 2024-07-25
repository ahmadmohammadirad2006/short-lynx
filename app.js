const express = require('express');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
const app = express();

const Url = require('./models/urlModel');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const urlRouter = require('./routes/urlRouter');

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 hour).
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use('/api', limiter);

// Body-parser
app.use(express.json({ limit: '10kb' }));

// Setting HTTP response headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
      },
    },
  })
);

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
