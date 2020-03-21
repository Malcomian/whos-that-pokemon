const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const keys = require('./config/keys');

// Connect to MongoDB - use keys.local to connect to local MongoDB or use keys.external to connect to Atlas
mongoose
  .connect(keys.local, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({
  extended: true
}));

// Express session
app.use(
  session({
    secret: keys.secret,
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

const defaultRoute = require('./config/defaultRoute')

// Routes
app.use(`${defaultRoute}/`, require('./routes/index'));
app.use(`${defaultRoute}/users`, require('./routes/users'));

// Static
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/node_modules'))

// Server
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));
