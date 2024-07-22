const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: path.join(__dirname, 'config.env') });

const app = require('./app');

const dbConnStr = process.env.DATABASE.replace(
  '[PASSWORD]',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(dbConnStr).then(() => {
  console.log('DB successfully connected');
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server running on ${port} port...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
