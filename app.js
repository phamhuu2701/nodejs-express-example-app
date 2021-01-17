require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');

const upload = multer();

const indexRouter = require('./src/routes/index');
const dbRouter = require('./src/routes/db');
const usersRouter = require('./src/routes/user');
const uploadRouter = require('./src/routes/upload');
const productColorRouter = require('./src/routes/productColor');
const productMaterialRouter = require('./src/routes/productMaterial');
const productSizeRouter = require('./src/routes/productSize');
const productStyleRouter = require('./src/routes/productStyle');

// connect mongodb
const CONFIG = require('./src/config');
const mongodb = require('./src/connector/mongo');
mongodb.connect(CONFIG.MONGO_URL);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(upload.none());

app.use('/', indexRouter);
app.use('/api/db', dbRouter);
app.use('/api/users', upload.none(), usersRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/product-colors', productColorRouter);
app.use('/api/product-materials', productMaterialRouter);
app.use('/api/product-sizes', productSizeRouter);
app.use('/api/product-styles', productStyleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
