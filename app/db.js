var sqlite3 = require('sqlite3').verbose(),
	fs = require('fs'),
	dbfile = "Database.db",
	logger = require('winston');


// класс объекта базы данных
var DatabaseParams = function(initDB) {
	this.initDB = initDB;
}

var database = new sqlite3.Database(dbfile);

initDB = function() {
	database.serialize(function() {
		database.all("SELECT name FROM sqlite_master WHERE type='table' AND name='USERS'", function(err, rows) {
			if (!rows.length){
				database.run("CREATE TABLE IF NOT EXISTS USERS (id INTEGER PRIMARY KEY ASC, name TEXT, login TEXT NOT NULL UNIQUE, password TEXT NOT NULL, email TEXT NOT NULL UNIQUE)", function(err, row) {
					if (err) {
				        logger.error("Create Table USERS:",err);
				    }
				    else {
				    	logger.info("Created Table USERS");
				    	var query = "INSERT into USERS (name, login, password, email) values (?, ?, ?, ?)";
				    	database.run(query, ["admin", "admin", "qwe123", "admin@ya.com"], function(err, rows) {
							if (err) {
								logger.error("Add admin:",err);
							}
							else {
								logger.info("Added Admin");
							}
						});
				    }
				});
			}
		})
		database.all("SELECT name FROM sqlite_master WHERE type='table' AND name='Schedule'", function(err, rows) {
			if (!rows.length) {
				createTableSchedule();
			}
		});
		database.all("SELECT name FROM sqlite_master WHERE type='table' AND name='Lectors'", function(err, rows) {
			if (!rows.length) {
				createTableLectors();
			}
		});
		database.all("SELECT name FROM sqlite_master WHERE type='table' AND name='Schools'", function(err, rows) {
			if (!rows.length) {
				createTableSchools();
			}
		});
		database.all("SELECT name FROM sqlite_master WHERE type='table' AND name='Classrooms'", function(err, rows) {
			if (!rows.length) {
				createTableClassrooms();
			}
		});
	});
}

exports.database = database;
exports.databaseParams = new DatabaseParams(initDB);

// создание таблицы Schedule
createTableSchedule = function() {
	database.run("CREATE TABLE IF NOT EXISTS Schedule ( id INTEGER PRIMARY KEY ASC, \
								idLector INTEGER NOT NULL, \
								name TEXT NOT NULL, \
								idSchool INTEGER NOT NULL, \
								idRoom INTEGER NOT NULL, \
								date TEXT NOT NULL, \
								UNIQUE(idSchool, date), \
								UNIQUE(idRoom, date))", function(err, row) {
		if (err) {
	        logger.error("Create Table Schedule:", err);
	    }
	    else {
	    	logger.info("Created Table Schedule");
	    }
	});
}
// создание таблицы Lectors
createTableLectors = function() {
	database.run("CREATE TABLE IF NOT EXISTS Lectors (id INTEGER PRIMARY KEY ASC, \
									name TEXT NOT NULL, \
									lastname TEXT NOT NULL, \
									description TEXT, \
									UNIQUE(name, lastname))", function(err, row) {
		if (err) {
	        logger.error("Create Table Lectors:", err);
	    }
	    else {
	    	logger.info("Created Table Lectors");
	    }
	});
}

// создание таблицы Classrooms
createTableClassrooms = function() {
	database.run("CREATE TABLE IF NOT EXISTS Classrooms (id INTEGER PRIMARY KEY ASC, \
									name TEXT NOT NULL UNIQUE, \
									capacity INTEGER NOT NULL, \
									description TEXT NOT NULL)", function(err, row) {
		if (err) {
	        logger.error("Create Table Classrooms:", err);
	    }
	    else {
	    	logger.info("Created Table Classrooms");
	    }
	});
}

// создание таблицы Schools
createTableSchools = function() {
	database.run("CREATE TABLE IF NOT EXISTS Schools (id INTEGER PRIMARY KEY ASC, \
									name TEXT NOT NULL, \
									students INTEGER NOT NULL, \
									UNIQUE(name))", function(err, row) {
		if (err) {
	        logger.error("Create Table Schools:", err);
	    }
	    else {
	    	logger.info("Created Table Schools");
	    }
	});
}

