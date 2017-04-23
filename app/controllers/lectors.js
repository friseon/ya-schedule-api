var logger = require('winston'),
    database = require('./../db').database,
	Lector = require('../models/lector');

// Routes
module.exports = function(app) {
    app.post('/addLector', addLector);
    app.post('/updateLector', updateLector);
    app.post('/removeLector', removeLector);
    app.get('/getLectors', getLectors);
    app.get('/lector/:id', getLector);
    app.get('/getLectorsFromShedule', getLectorsFromShedule)
};

// Controlls

// получение информации о лекторе
var getLector = function(req, res) {
    var id = req.params.id;
    database.all("SELECT * FROM Lectors WHERE id = " + id, function(err, rows) {
        if (err) {
            logger.error("GET Lector FROM Lectors", err)
            res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
        }
        else if (rows) {
            res.send(new Lector(rows[0]));
        }
    });
}

var addLector = function(req, res) {
    if (req.session.user) {
        var newLector = req.body;
    	var query = "INSERT into Lectors (name, lastname, description) values (?, ?, ?)";
    	
        database.run(query, [newLector.name, newLector.lastname, newLector.description], function(err, row) {
            if (err) {
                if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
            		logger.error("Такой лектор уже существует:", newLector.name, newLector.lastname)
                	res.send({warning: "Такой лектор уже существует"});
                }
                else {
                    logger.error(query, ":", err);
                    res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
                }
            }
            else {
            	logger.info("Добавлен лектор:", newLector.name, newLector.lastname);
                res.send(true);
            }
        })
    }
}

var updateLector = function(req, res) {
    if (req.session.user) {
        var lector = req.body;
        var query = "UPDATE Lectors set (name, lastname, description) = (?, ?, ?) WHERE id = " + lector.id;
        database.run(query, [lector.name, lector.lastname, lector.description], function(err, row) {
            if (err) {
                if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
                    logger.error("Такой лектор уже существует:", lector.name, lector.lastname)
                    res.send({warning: "Такой лектор уже существует"});
                }
                else {
                    logger.error(query, ":", err);
                    res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
                }
            }
            else {
                logger.info("Обновлен лектор:", lector.name, lector.lastname);
                res.send(true);
            }
        })
    }
}

var removeLector = function(req, res) {
    if (req.session.user) {
        var lector = req.body;
        database.all("SELECT * FROM Schedule WHERE idLector = " + lector.id, function(err, rows) {
            if (rows.length) {
                res.send({warning: "Нельзя удалить этого лектора, т.к. у него есть лекция в расписании"});
            }
            else {
            	var query = "DELETE FROM Lectors where id = " + lector.id ;
            	
                database.run(query, function(err, row) {
                    if (err) {
                        logger.error(query, ":", err);
                        res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
                    }
                    else {
                    	logger.info("Удален лектор:", lector.name, lector.lastname);
                        res.send(true);
                    }
                })
            }
        });
    }
}

var getLectors = function(req, res) {
	var lectors = [];
	
	database.all("SELECT id, name, lastname, description FROM Lectors", function(err, rows) {
	    if (err) {
            logger.error("GET ALL FROM Lectors", err);
	    	res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
	    }
        else {
            rows.forEach(function (row) {
                lector = new Lector(row);
                lectors.push(lector);
            });
            res.send(lectors);
        }
	});
}

// получить только тех лекторов, которые есть в расписании
var getLectorsFromShedule = function(req, res) {
    var schools = [];

    database.all("SELECT GROUP_CONCAT(idLector) from Schedule" ,function(err, rows) {
        var ids = rows[0]["GROUP_CONCAT(idLector)"];
        database.all("SELECT name, lastname, description FROM Lectors WHERE id in (" + ids + ")", function(err, rows) {
            if (err) {
                logger.error("GET Lectors FROM Schedule", err)
                res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
            }
            else {
                rows.forEach(function (row) {
                    school = new ClassRoom(row);
                    schools.push(school);
                });
                res.send(schools);
            }
        });
    })
}