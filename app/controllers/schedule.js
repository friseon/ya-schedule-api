var logger = require('winston'),
    database = require('./../db').database,
    Lecture = require('../models/lecture');

// Routes
module.exports = function(app) {
    app.post('/addLecture', addLecture);
    app.post('/updateLecture', updateLecture);
    app.get('/lecture/:id', getLecture);
    app.post('/removeLecture', removeLecture);
    app.get('/getSchedule', getSchedule); 
};

var addLecture = function(req, res) {
    if (req.session.user) {
        var newLecture = req.body;
    	var query = "INSERT into Schedule (name, idLector, idSchool, idRoom, date) values (?, ?, ?, ?, ?)";
        database.run(query, [newLecture.name, newLecture.lector, newLecture.school, newLecture.room, newLecture.date], function(err, row) {
            if (err) {
                if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
            		logger.error("Такая лекция уже существует:", newLecture.name)
                	res.send({warning: "Такая лекция уже существует"});
                }
                else {
                    logger.error(query, ":", err);
                    res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
                }
            }
            else {
            	logger.info("Добавлена лекция:", newLecture.name);
                res.send(true);
            }
        })
    }
}

var getLecture = function(req, res) {
    if (req.session.user) {
        var id = req.params.id;
        database.all("SELECT id, name, idLector, idSchool, idRoom, date FROM Schedule WHERE id = " + id, function(err, rows) {
            if (err) {
                logger.error("GET Lecture FROM Schedule", err)
                res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
            }
            else if (rows) {
                res.send(new Lecture(rows[0]));
            }
        });
    }
}

var updateLecture = function(req, res) {
    if (req.session.user) {
        var lecture = req.body;
        var query = "UPDATE Schedule set (name, idLector, idSchool, idRoom, date) = (?, ?, ?, ?, ?) WHERE id = " + lecture.id;
        database.run(query, [lecture.name, lecture.idLector, lecture.idSchool, lecture.idRoom, lecture.date], function(err, row) {
            if (err) {
                if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
                    logger.error("Такая лекция уже существует:", lecture.name)
                    res.send({warning: "Такая лекция уже существует"});
                }
                else {
                    logger.error(query, ":", err);
                    res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
                }
            }
            else {
                logger.info("Обновлена лекция:", lecture.name);
                res.send(true);
            }
        })
    }
}

var removeLecture = function(req, res) {
    if (req.session.user) {
        var lecture = req.body;
    	var query = "DELETE FROM Schedule where id = " + lecture.id ;
        database.run(query, function(err, row) {
            if (err) {
                logger.error(query, ":", err);                
                res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
            }
            else {
            	logger.info("Удалена лекция:", lecture.name);
                res.send(true);
            }
        })
    }
}

var getSchedule = function(req, res) {
	var lectures = [];
	database.all("SELECT schedule.id, schedule.name, (lectors.lastname || ' ' || lectors.name) as lector, schools.name as school, Classrooms.name as room, schedule.date FROM Schedule \
                  left join lectors \
                  on schedule.idLector = lectors.id \
                  left join schools \
                  on schedule.idSchool = schools.id \
                  left join Classrooms \
                  on schedule.idRoom = Classrooms.id \
                  ORDER BY schedule.date ASC", function(err, rows) {
	    if (err) {
            logger.error("GET ALL FROM Schedule", err)
	    	res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
	    }
        else {
            rows.forEach(function (row) {
                lecture = row;
                lectures.push(lecture);
            });
            res.send(lectures);
        }
	});
}