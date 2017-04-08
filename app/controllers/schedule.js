var logger = require('winston'),
    database = require('./../db').database,
    Lecture = require('../models/lecture');

// Routes
module.exports = function(app) {
    app.post('/addLecture', updateLecture);
    app.post('/updateLecture', updateLecture);
    app.get('/lecture/:id', getLecture);
    app.post('/removeLecture', removeLecture);
    app.get('/getSchedule', getSchedule); 
};

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
        var capacity = 0;
        var students = 1;
        var query = "";
        database.all("SELECT capacity FROM Classrooms WHERE id = " + lecture.idRoom, function(err, rows) {
            if (err) {
                logger.error("GET capacity FROM Classrooms", err)
                res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
            }
            else if (rows) {
                capacity = rows[0].capacity;

                database.all("SELECT students FROM SCHOOLS WHERE id = " + lecture.idSchool, function(err, rows) {
                    if (err) {
                        logger.error("GET students FROM SCHOOLS", err)
                        res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
                    }
                    else if (rows) {
                        students = rows[0].students;

                        if (capacity >= students) {
                            if (lecture.id) {
                                query = "UPDATE Schedule set (name, idLector, idSchool, idRoom, date) = (?, ?, ?, ?, ?) WHERE id = " + lecture.id;
                            }
                            else {
                                query = "INSERT into Schedule (name, idLector, idSchool, idRoom, date) values (?, ?, ?, ?, ?)";
                            }
                            database.run(query, [lecture.name, lecture.idLector, lecture.idSchool, lecture.idRoom, lecture.date], function(err, row) {
                                if (err) {
                                    if (err.toString().indexOf('UNIQUE constraint failed: Schedule.idRoom, Schedule.date') >= 0) {
                                        res.send({warning: "Аудитория на эту дату занята"});
                                    }
                                    else if (err.toString().indexOf('UNIQUE constraint failed: Schedule.idSchool, Schedule.date') >= 0) {
                                        res.send({warning: "У школы уже есть лекция на эту дату"});
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
                            });
                        }
                        else {
                            res.send({warning: "Выбранная аудитория не может вместить количество студентов в этой школе"});
                        }
                    }
                });
            }
        });
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