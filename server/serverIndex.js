const express = require('express');
const parse = require('body-parser');
const morgan = require('morgan');

const router = require('./routes/routes.js');

require('dotenv').config();

const app = express();

app.use(morgan('dev'));

app.use(parse.json());

app.use(express.static(`${__dirname}/../client`));

app.use('/', router);

const port = process.env.PORT || 8001;

app.listen(port, err => (
  err ? console.log('err') : console.log(`listening on port ${port}`) // eslint-disable-line
));

module.exports = app;
