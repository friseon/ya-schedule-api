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
        database.all("SELECT id, name, idLector, idSchool, idRoom, timeStart, timeEnd, date FROM Schedule WHERE id = " + id, function(err, rows) {
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
        
        if (lecture.timeStart >= lecture.timeEnd) {
            res.send({ warning: "Некорректное время лекции"});
        } 
        else {
            isCapacityMoreThanStudents(lecture, res);
        }
    }
}

var isCapacityMoreThanStudents = function(lecture, res) {
    var capacity = 0;
    var students = 1;
    database.all("SELECT capacity FROM Classrooms WHERE id = " + lecture.idRoom, function(err, rows) {
        if (err || !rows) {
            logger.error("GET capacity FROM Classrooms", err)
            return({error: "Ошибка сервера. Выполнить операцию не удалось"});
        }
        else if (rows) {
            capacity = rows[0].capacity;

            database.all("SELECT students FROM SCHOOLS WHERE id = " + lecture.idSchool, function(err, rows) {
                if (err || !rows) {
                    logger.error("GET students FROM SCHOOLS", err)
                    return({error: "Ошибка сервера. Выполнить операцию не удалось"});
                }
                else if (rows) {
                    students = rows[0].students;
                    if (capacity >= students) {
                        isLectorFree(lecture, res)
                    }
                    else {
                        res.send({warning: "Выбранная аудитория не может вместить количество студентов в этой школе"});
                    }
                }
            })
        }
    });
}

var isLectorFree = function(lecture, res) {
    lecture.id = lecture.id ? lecture.id : null;
    database.all("SELECT schools.name as school, Classrooms.name, schedule.name as room FROM Schedule \
                    left join schools \
                    on schedule.idSchool = schools.id \
                    left join Classrooms \
                    on schedule.idRoom = Classrooms.id \
                            WHERE schedule.idLector == " + lecture.idLector + 
                                                                " AND ( \
                                                                    ( \
                                                                        (timeStart <= '" + lecture.timeStart + "' AND timeEnd >= '" + lecture.timeStart + "') OR \
                                                                        (timeStart <= '" + lecture.timeEnd + "' AND timeEnd >= '" + lecture.timeEnd + "') \
                                                                    )" +
                                                                    " OR \
                                                                    ( \
                                                                        (timeStart >= '" + lecture.timeStart + "' AND timeEnd >= '" + lecture.timeStart + "') AND \
                                                                        (timeStart <= '" + lecture.timeEnd + "' AND timeEnd <= '" + lecture.timeEnd + "') \
                                                                    ) \
                                                                ) AND schedule.id != " + lecture.id, function(err, rows) {
        if (err) {
            logger.error("GET Lector's time FROM Schedule", err)
            res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
        }
        else {
            if (rows.length) {
                res.send({warning: "Лектор в это время занят: " + rows[0].name + " - " + rows[0].school + " (" + rows[0].room + ")"});
            }
            else
                isSchoolFree(lecture, res);
        }
    })
}

var isSchoolFree = function(lecture, res) {
    database.all("SELECT (lectors.lastname || ' ' || lectors.name) as lector, Classrooms.name, schedule.name as room FROM Schedule \
                    left join lectors \
                    on schedule.idLector = lectors.id \
                    left join Classrooms \
                    on schedule.idRoom = Classrooms.id \
                            WHERE schedule.idSchool == " + lecture.idSchool + 
                                                                " AND ( \
                                                                    ( \
                                                                        (timeStart <= '" + lecture.timeStart + "' AND timeEnd >= '" + lecture.timeStart + "') OR \
                                                                        (timeStart <= '" + lecture.timeEnd + "' AND timeEnd >= '" + lecture.timeEnd + "') \
                                                                    )" +
                                                                    " OR \
                                                                    ( \
                                                                        (timeStart >= '" + lecture.timeStart + "' AND timeEnd >= '" + lecture.timeStart + "') AND \
                                                                        (timeStart <= '" + lecture.timeEnd + "' AND timeEnd <= '" + lecture.timeEnd + "') \
                                                                    ) \
                                                                ) AND schedule.id != " + lecture.id, function(err, rows) {
        if (err) {
            logger.error("GET Lector's time FROM Schedule", err)
            res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
        }
        else {
            if (rows.length) {
                res.send({warning: "У школы уже есть лекция в это время: " + rows[0].name + " - " + rows[0].room + " (" + rows[0].lector + ")"});
            }
            else
                isRoomFree(lecture, res);
        }
    })
}

var isRoomFree = function(lecture, res) {
    console.log(lecture);
    database.all("SELECT (lectors.lastname || ' ' || lectors.name) as lector, schools.name, schedule.name as school FROM Schedule \
                    left join lectors \
                    on schedule.idLector = lectors.id \
                    left join schools \
                    on schedule.idSchool = schools.id \
                            WHERE schedule.idRoom == " + lecture.idRoom + 
                                                                " AND ( \
                                                                    ( \
                                                                        (timeStart <= '" + lecture.timeStart + "' AND timeEnd >= '" + lecture.timeStart + "') OR \
                                                                        (timeStart <= '" + lecture.timeEnd + "' AND timeEnd >= '" + lecture.timeEnd + "') \
                                                                    )" +
                                                                    " OR \
                                                                    ( \
                                                                        (timeStart >= '" + lecture.timeStart + "' AND timeEnd >= '" + lecture.timeStart + "') AND \
                                                                        (timeStart <= '" + lecture.timeEnd + "' AND timeEnd <= '" + lecture.timeEnd + "') \
                                                                    ) \
                                                                ) AND schedule.id != " + lecture.id, function(err, rows) {
        if (err) {
            logger.error("GET Lector's time FROM Schedule", err)
            res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
        }
        else {
            if (rows.length) {
                res.send({warning: "Аудитория на это время занята: " + rows[0].name + " - " + rows[0].school + " (" + rows[0].lector + ")"});
            }
            else
                setLectureInDB(lecture, res);
        }
    })
}

var setLectureInDB = function(lecture, res) {
    var query = "";
    if (lecture.id) {
        query = "UPDATE Schedule set (name, idLector, idSchool, idRoom, date, timeStart, timeEnd) = (?, ?, ?, ?, ?, ?, ? ) WHERE id = " + lecture.id;
    }
    else {
        query = "INSERT into Schedule (name, idLector, idSchool, idRoom, date, timeStart, timeEnd) values (?, ?, ?, ?, ?, ?, ?)";
    }
    database.run(query, [lecture.name, lecture.idLector, lecture.idSchool, lecture.idRoom, lecture.date, lecture.timeStart, lecture.timeEnd], function(err, row) {
        if (err) {
            logger.error(query, ":", err);
            res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
        }
        else {
            logger.info("Обновлена лекция:", lecture.name);
            res.send(true);
        }
    });
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
	database.all("SELECT schedule.id, schedule.name, (lectors.lastname || ' ' || lectors.name) as lector, schools.name as school, Classrooms.name as room, schedule.timeStart, schedule.timeEnd, schedule.date FROM Schedule \
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