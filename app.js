require('dotenv').config();
require('./helper/mongoose.helper');
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const authRoute = require('./routes/auth.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello from express');
});

app.use('/auth', authRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

// eslint-disable-next-line
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  // eslint-disable-next-line
  console.info(`Server running on port ${port}`);
});
