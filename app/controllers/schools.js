var logger = require('winston'),
    database = require('./../db').database,
    School = require('../models/school');

// Routes
module.exports = function(app) {
    app.post('/addSchool', addSchool);
    app.post('/updateSchool', updateSchool);
    app.post('/removeSchool', removeSchool);
    app.get('/getSchools', getSchools); 
};

var addSchool = function(req, res) {
    if (req.session.user) {
        var newSchool = req.body;
    	var query = "INSERT into Schools (name, students) values (?, ?)";
        database.run(query, [newSchool.name, newSchool.students], function(err, row) {
            if (err) {
                if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
            		logger.error("Такая школа уже существует:", newSchool.name)
                	res.send({warning: "Такая школа уже существует"});
                }
                else {
                    logger.error(query, ":", err);
                    res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
                }
            }
            else {
            	logger.info("Добавлена школа:", newSchool.name);
                res.send(true);
            }
        })
    }
}

var updateSchool = function(req, res) {
    if (req.session.user) {
        var school = req.body;
        var query = "UPDATE Schools set (name, students) = (?, ?) WHERE id = " + school.id;
        database.run(query, [school.name, school.students], function(err, row) {
            if (err) {
                if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
                    logger.error("Такая школа уже существует:", school.name)
                    res.send({warning: "Такая школа уже существует"});
                }
                else {
                    logger.error(query, ":", err);
                    res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
                }
            }
            else {
                logger.info("Обновлена школа:", school.name);
                res.send(true);
            }
        })
    }
}

var removeSchool = function(req, res) {    
    if (req.session.user) {
        var school = req.body;
        database.all("SELECT * FROM Schedule WHERE idSchool = " + school.id, function(err, rows) {
            if (rows.length) {
                res.send({warning: "Нельзя удалить эту школу, т.к. у неё есть лекция в расписании"});
            }
            else {
                var query = "DELETE FROM Schools where id = " + school.id ;
                database.run(query, function(err, row) {
                    if (err) {
                        logger.error(query, ":", err);                
                        res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
                    }
                    else {
                        logger.info("Удалена школа:", school.name);
                        res.send(true);
                    }
                })
            }
        });
    }
}

var getSchools = function(req, res) {
    if (req.session.user) {
    	var schools = [];
    	database.all("SELECT id, name, students FROM Schools", function(err, rows) {
    	    if (err) {
                logger.error("GET ALL FROM Schools", err)
    	    	res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
    	    }
            else {
                rows.forEach(function (row) {
                    school = new School(row);
                    schools.push(school);
                });
                res.send(schools);
            }
    	});
    }
}