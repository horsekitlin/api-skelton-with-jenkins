import _ from 'lodash';
import routes from './routes';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

var multipart = require('connect-multiparty')();
var app = express();
var corsMiddler = cors();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multipart);
app.use(corsMiddler);
app.use(express.static(path.join(__dirname, 'public')));

_.map(routes, (route, key) => {
  app.use(`/${key}`, route);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({
    message: "route is not exist"
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message
  });
});

process.on('uncaughtException', (err) => {
  console.log('無法預期的錯誤');
});

module.exports = app;
