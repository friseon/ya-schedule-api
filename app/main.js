var express = require('express'),
    http = require('http'),
    Database = require('./db'),
    bodyParser= require('body-parser'),
    logger = require('winston'),
    session = require('express-session'),
    path = require('path'),
    appDir = path.dirname(require.main.filename),
    pages = require(__dirname + '/controllers/pages'),
    lectorCtrl = require(__dirname + '/controllers/lectors'),
    Lector = require('./models/lector');

var Application = express();
var db = Database;

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
Application.set('view engine', 'ejs')

module.exports = Application;


Application.get('/', function(req, res) {
  res.redirect('/home');
})

Application.get('/home', function(req, res) {
  db.initDB(function(result) {
    res.send(result);
  })
  pages.home(req, res)
})

Application.get('/admin', function(req, res) {
  if (!req.session.user) {
    res.redirect('/login');
  } else if (req.session.user.admin != 1) {
    res.redirect('/home');
  } else {
    pages.admin(req, res)
  }
})

Application.get('/login', function(req, res) {
	if (req.session.user) {
		res.redirect('/home');
	}
	else {
		pages.login(req, res)
	}
})

Application.post('/login', function(req, res) {
	db.login(req.body, function(result) {
	    if (result.result) {
	    	req.session.user = result.user;
        if (req.session.user.admin === 1) {
          res.redirect('/admin');
        }
        else {
          res.redirect('/home');
        }
	    }
	    else {
	    	pages.login(result, res)
	    }
	});
})

Application.get('/logout', function(req, res) {
	logger.info("Logout user", req.session.user);
	req.session.destroy();
  res.redirect('/');
})


Application.get('/init', function(req, res) {
  db.initDB(function(result) {
    res.send(result);
  })
});


// Schedule

Application.post('/addLection', function(req, res) {
  if (req.session.user)
    {
    db.addLection(req.body, function(result) {
      res.send(result);
    });
  }
})

Application.get('/getSchedule', function(req, res) {
  if (req.session.user)
    {
    db.getSchedule(req.body, function(result) {
      res.send(result);
    });
  }
})

// /Schedule
// Schools

Application.post('/addSchool', function(req, res) {
	if (req.session.user)
    {
		db.addSchool(req.body, function(result) {
			res.send(result);
		});
	}
})

Application.get('/getSchools', function(req, res) {
  if (req.session.user)
    {
    db.getSchools(req.body, function(result) {
      res.send(result);
    });
  }
})

// /Schools
// Classroom

Application.post('/addClassroom', function(req, res) {
  if (req.session.user)
    {
    db.addClassroom(req.body, function(result) {
      res.send(result);
    });
  }
})

Application.get('/getClassrooms', function(req, res) {
  if (req.session.user)
    {
    db.getClassrooms(req.body, function(result) {
      res.send(result);
    });
  }
})

// /Classroom
// Lectors

Application.post('/addLector', function(req, res) {
  if (req.session.user) {
    var lector = new Lector(req.body);
    lectorCtrl.add(lector, db, function(result) {
      console.log(result);
      res.send(result);
    });
  }
})

Application.get('/getLectors', function(req, res) {
  if (req.session.user)
    {
    lectorCtrl.getLectors(db, function(result) {
      res.send(result);
    });
  }
})

// /Lectors

Application.get('*', function(req, res) {
  res.send("Page not found");
})