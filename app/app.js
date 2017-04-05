var express = require('express'),
    http = require('http'),
    database = require('./db').database,
    bodyParser= require('body-parser'),
    logger = require('winston'),
    session = require('express-session'),
    path = require('path'),
    appDir = path.dirname(require.main.filename),
    pages = require(__dirname + '/controllers/pages');

var Application = express();

var tsFormat = () => (new Date()).toLocaleTimeString();

logger.add(logger.transports.File, { filename: 'all.log', timestamp: tsFormat });

Application.use(express.static(appDir + '/public'));
Application.use(express.static(appDir + '/dist'));

Application.use(bodyParser.json());
Application.use(bodyParser.urlencoded({ extended: true }));

Application.use(session({
  'secret': 'top_secret',
  'resave': true,
  'saveUninitialized': true
}));

Application.set('views', __dirname + "/views");
Application.set('view engine', 'ejs');

module.exports = Application;

// Controllers/Routes

require(__dirname + '/controllers/authentication')(Application);
require(__dirname + '/controllers/lectors')(Application);
require(__dirname + '/controllers/classRooms')(Application);
require(__dirname + '/controllers/schools')(Application);
require(__dirname + '/controllers/schedule')(Application);

Application.get('/', function(req, res) {
  res.redirect('/home');
})

Application.get('/home', function(req, res) {
  pages.home(req, res)
})

Application.get('/isLogin', function(req, res) {
  res.send(!!req.session.user);
})

// Application.get('/admin', function(req, res) {
//   if (!req.session.user) {
//     res.redirect('/login');
//   }
//   else {;
//     pages.admin(req, res)
//   }
// })

Application.get(/admin/, function(req, res) {
  if (!req.session.user) {
    res.redirect('/login');
  }
  else {
    pages.admin(req, res)
  }
})

Application.get('/login', function(req, res) {
  if (req.session.user) {
    res.redirect('/admin');
  }
  else {
    pages.home(req, res)
  }	
})

Application.get('*', function(req, res) {
  res.send("Page not found");
})