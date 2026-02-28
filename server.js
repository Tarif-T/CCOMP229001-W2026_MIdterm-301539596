var express = require('express');
var createError = require('http-errors');
var logger = require('morgan');
var cors = require('cors');

var db = require('./config/db');

var carRouter = require('./app/routers/cars');
var indexRouter = require('./app/routers/index');

var app = express();

db(); // Connect to the DB.

app.use(cors()); // CORS for all clients
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(logger('dev')); // Log in the terminal

// Set up the routers
app.use('/', indexRouter);
app.use('/api/cars', carRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error json
  res.status(err.status || 500);
  res.json(
    {
      success: false,
      message: err.message
    }
  );
});

// Initialize the server
var port = process.env.PORT || 3000;
app.listen(port);

console.log(`Server running at http://localhost:${port}/`);