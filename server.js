var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var passport = require('passport');
var methodOverride = require('method-override');

// load the env vars
require('dotenv').config();

// create the Express app
var app = express();

// connect to the MongoDB with mongoose
require('./config/database');
require('./config/passport');

// require our routes
var indexRoutes = require('./routes/index');
var makersRoutes = require('./routes/makers');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'SEIRocks!',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// custom middleware that passes req.user to all templates
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// mount all routes with appropriate base paths
app.use('/', indexRoutes);
app.use('/', makersRoutes);

// invalid request, send 404 page
app.use(function (req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
