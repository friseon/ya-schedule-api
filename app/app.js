var express = require('express'),
    http = require('http'),
    database = require('./db').database,
    bodyParser= require('body-parser'),
    logger = require('winston'),
    session = require('express-session'),
    path = require('path'),
    appDir = path.dirname(require.main.filename),
    pages = require(__dirname + '/controllers/pages'),
    schoolCtrl = require(__dirname + '/controllers/schools'),
    School = require('./models/school');

var Application = express();

var tsFormat = () => (new Date()).toLocaleTimeString();

logger.add(logger.transports.File, { filename: 'all.log', timestamp: tsFormat, colorize: true });

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

require(__dirname + '/controllers/lectors')(Application);
require(__dirname + '/controllers/classRooms')(Application);


Application.get('/', function(req, res) {
  res.redirect('/home');
})

Application.get('/home', function(req, res) {
  
  pages.home(req, res)
})

Application.get('/isLogin', function(req, res) {
  res.send(!!req.session.user);
})

Application.get('/admin', function(req, res) {
  if (!req.session.user) {
    res.redirect('/login');
  }
  else {;
    pages.admin(req, res)
  }
})

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

Application.post('/login', function(req, res) {
	var user = req.body;
  var query = "SELECT id, name, email, admin from USERS where (login = '" + user.login + "' or email = '" + user.login + "') and password = '" + user.password + "'";
  database.all(query, function(err, rows) {
    var result;
    var error;
    var selectedUser;
    if (err) {
      result = false;
      error = err;
      logger.warn('Login as', user.login, '- FAIL: ', err);
    }
    if (rows && rows.length == 1) {
      result = true;
      selectedUser = rows[0];
      logger.info('Login as',  user.login, 'success');
      req.session.user = selectedUser;
      // res.redirect(200, '/admin');
      // res.send(result);
    } else {
      result = false;
      error = "Неверный логин или пароль";
      logger.warn('Login as',  user.login, '- FAIL: Wrong login or password');
    }    
    resultData = {
      'result': result,
      'message': error,
      'user': selectedUser
    }
    // res.redirect('/admin');
    res.send(resultData);
  });
})

Application.get('/logout', function(req, res) {
	logger.info("Logout user", req.session.user);
	req.session.destroy();
  res.redirect('/');
})


// Schedule

Application.post('/addLection', function(req, res) {
  if (req.session.user)
    {
    database.addLection(req.body, function(result) {
      res.send(result);
    });
  }
})

Application.get('/getSchedule', function(req, res) {
  if (req.session.user)
    {
    database.getSchedule(req.body, function(result) {
      res.send(result);
    });
  }
})

// /Schedule
// Schools

Application.post('/addSchool', function(req, res) {
	if (req.session.user)
    {
    var school = new School(req.body);
		schoolCtrl.add(school, db, function(result) {
			res.send(result);
		});
	}
})

Application.post('/removeSchool', function(req, res) {
  if (req.session.user) {
    var school = new School(req.body);
    schoolCtrl.remove(school, db, function(result) {
      res.send(result);
    });
  }
})

Application.get('/getSchools', function(req, res) {
  if (req.session.user)
    {
    schoolCtrl.getSchools(db, function(result) {
      res.send(result);
    });
  }
})

// /Schools

Application.get('*', function(req, res) {
  res.send("Page not found");
})