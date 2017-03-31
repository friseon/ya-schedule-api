var sqlite3 = require('sqlite3').verbose(),
	dbfile = "database.db",
	fs = require('fs'),
	logger = require('winston'),
	lectors = require('./controllers/lectors');

// класс объекта базы данных
function Database() {
	this.dbfile = "database.db";
	this.connect = function() {
		return new sqlite3.Database(this.dbfile);
	}
}

// создание переменных
var dataBase = new Database();

module.exports = dataBase;

Database.prototype.initDB = function(cb) {
	if (!fs.existsSync(dbfile)) {
		logger.info("File", dbfile, "doesn't exist. Creating new.");
		var db = (new Database()).connect();
		db.serialize(function(exists) {
			db.run("CREATE TABLE USERS (id INTEGER PRIMARY KEY ASC, name TEXT, login TEXT NOT NULL UNIQUE, password TEXT NOT NULL, email TEXT NOT NULL UNIQUE, admin INTEGER)", function(err, row) {
				if (err) {
			        logger.error("Init DB:",err);
			    }
			    else {
			    	var query = "INSERT into USERS (name, login, password, email, admin) values (?, ?, ?, ?, ?)";
			    	db.run(query, ["admin", "admin", "qwe123", "frise.on@gmail.com", 1], function(err, row) {
						if (err) {		
							logger.error("Add admin:",err);
							return cb(err);
						}
						db.close();
						logger.info("Admin added. BD init");
						return cb("Admin added");
					});
					createTableSchedule(db);
					createTableLectors(db);
			    }
			});
		});
	}
}

// создание таблицы Schedule
createTableSchedule = function(db) {
	var db = (new Database()).connect();
	db.run("CREATE TABLE IF NOT EXISTS Schedule ( id INTEGER PRIMARY KEY ASC, \
								idLector INTEGER NOT NULL, \
								lectionName TEXT NOT NULL, \
								idSchool INTEGER NOT NULL, \
								idRoom INTEGER NOT NULL, \
								date TEXT NOT NULL, \
								UNIQUE(date, idSchool), \
								UNIQUE(idRoom, date))", function(err, row) {
		if (err) {
	        logger.error("Create Table DATA:", err);
	        db.close();
	    }
	    else {
	    	logger.info("Create Table DATA");
	    	db.close();
	    }
	});
}

// get all Lectors
Database.prototype.getSchedule = function(user, cb) {	
	var schedule = [];
	var db = (new Database()).connect();
	db.all("SELECT id, name, lastname, description FROM Schedule", function(err, rows) {
	    if (err) {
			db.close();
	    	return cb(err);
	    }
	    rows.forEach(function (row) {
	    	schedule.push(row);
	    });
	    db.close();
	    return cb(schedule);
	});
}

// добавление записи в Lections
Database.prototype.addLection = function(item, cb) {
	var db = (new Database()).connect();
	var query = "INSERT into Schedule (idLector, lectionName, idSchool, idRoom, date) values (?, ?, ?, ?, ?)";
	db.run(query, [item.lector, item.lectionName, item.school, item.room, item.date], function(err, row) {
		if (err) {			
			if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
				err = "Такая лекция уже существует";
			}			
			logger.error("Add item to Lections:", err)
			return cb(err);
		}
		logger.info("Add item to Lections:", item.lectionName)
		db.close();
		return cb("OK");
	})
}

// создание таблицы Lectors
createTableLectors = function(db) {
	var db = (new Database()).connect();
	db.run("CREATE TABLE IF NOT EXISTS Lectors (id INTEGER PRIMARY KEY ASC, \
									name TEXT NOT NULL, \
									lastname TEXT NOT NULL, \
									description TEXT, \
									UNIQUE(name, lastname))", function(err, row) {
		if (err) {
	        logger.error("Create Table Lectors:", err);
	        db.close();
	    }
	    else {
	    	logger.info("Create Table Lectors");
	    	db.close();
	    }
	});
}

// создание таблицы Classrooms
createTableClassrooms = function(db) {
	var db = (new Database()).connect();
	db.run("CREATE TABLE IF NOT EXISTS Classrooms (id INTEGER PRIMARY KEY ASC, \
									name TEXT NOT NULL, \
									number INTEGER NOT NULL, \
									address TEXT NOT NULL, \
									capacity INTEGER NOT NULL, \
									description TEXT, \
									UNIQUE(name, number))", function(err, row) {
		if (err) {
	        logger.error("Create Table Classrooms:", err);
	        db.close();
	    }
	    else {
	    	logger.info("Create Table Classrooms");
	    	db.close();
	    }
	});
}


// get Lection
Database.prototype.getLection = function(idUser, cb) {	
	var items = [];
	var db = (new Database()).connect();
	db.all("select directory.name, directory.type, categories.name as name_cat from directory \
			left join categories \
			on directory.idCategory=categories.id \
			WHERE directory.idUser LIKE '%" + idUser + "%' or directory.idUser LIKE '%" + 1 + "%'", function(err, rows) {
	    if (err) {
			db.close();
			logger.error("getDirectory:", err);
	    	return cb(err);
	    }
	    rows.forEach(function (row) {
	    	items.push(row);
	    });
	    db.close();
	    return cb(items);
	});
}

// authorization
Database.prototype.login = function(user, cb) {
  var db = dataBase.connect();
  var query = "SELECT id, name, email, admin from USERS where (login = '" + user.login + "' or email = '" + user.login + "') and password = '" + user.password + "'";
  db.all(query, function(err, rows) {
    var res;
    var error;
    var selectedUser;
    if (err) {
      res = false;
      error = err;
      logger.warn('Login as', login, '- FAIL: ', err);
    }
    if (rows && rows.length == 1) {
      res = true;
      selectedUser = rows[0];
      logger.info('Login as',  user.login, 'success');
    } else {
      res = false;
      error = "Неверный логин или пароль";
      logger.warn('Login as',  user.login, '- FAIL: Wrong login or password');
    }
    var result = {
      'result': res,
      'message': error,
      'user': selectedUser
    }
    db.close();
    return cb(result);
  });
}