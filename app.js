require('dotenv').config();
const express = require('express');
const app = express();
const chalk = require('chalk');
const backendSetup = require('./server/middlewares/backendMiddleware');

backendSetup(app);

app.use(express.static('public'));
app.use(express.static('client'));

const host = process.env.HOST | 'localhost';
const port = process.env.PORT | 3000;

app.listen(port, host, (err) => {
  if (err) {
    return console.error(err.message);
  }
  
  console.log(`Server started on ${host}:${port}! ${chalk.green('✓')}`);
});

module.exports = app;
