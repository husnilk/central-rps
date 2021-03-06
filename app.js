var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Router setup
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var rpsRouter = require('./routes/rps');
var cpmkRouter  = require('./routes/rps_cpmk');
var mingguanRouter = require('./routes/rps_mingguan');
var penilaianRouter = require('./routes/rps_penilaian');
var referensiRouter = require('./routes/rps_referensi');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/bo/rps', rpsRouter);
app.use('/bo/rps', cpmkRouter);
app.use('/bo/rps', penilaianRouter);
app.use('/bo/rps', referensiRouter);
app.use('/bo/rps', mingguanRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
