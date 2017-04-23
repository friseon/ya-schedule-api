var logger = require('winston'),
    database = require('./../db').database,
	ClassRoom = require('../models/classRoom');

// Routes
module.exports = function(app) {
    app.post('/addClassRoom', addClassRoom);
    app.post('/updateClassRoom', updateClassRoom);
    app.post('/removeClassRoom',removeClassRoom);
    app.get('/getClassRooms', getClassRooms);
    app.get('/classRoom/:id', getClassRoom);
    app.get('/getClassRoomsFromShedule', getClassRoomsFromShedule)
};

// Controlls

// получение информации об аудитории
var getClassRoom = function(req, res) {
    var id = req.params.id;
    database.all("SELECT * FROM classRooms WHERE id = " + id, function(err, rows) {
        if (err) {
            logger.error("GET classRoom FROM classRooms", err)
            res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
        }
        else if (rows) {
            res.send(new ClassRoom(rows[0]));
        }
    });
}

var addClassRoom = function(req, res) {
    if (req.session.user) {
        var newRoom = req.body;
    	var query = "INSERT into classRooms (name, capacity, description) values (?, ?, ?)";
    	
        database.run(query, [newRoom.name, newRoom.capacity, newRoom.description], function(err, row) {
            if (err) {
                if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
            		logger.error("Такая аудитория уже существует:", newRoom.name)
                	res.send({warning: "Такая аудитория уже существует"});
                }
                else {
                    logger.error(query, ":", err);
                    res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
                }
            }
            else {
            	logger.info("Добавлена аудитория:", newRoom.name);
                res.send(true);
            }
        })
    }
}

var updateClassRoom = function(req, res) {
    if (req.session.user) {
        var room = req.body;
        var query = "UPDATE classRooms set (name, capacity, description) = (?, ?, ?) WHERE id = " + room.id;
        database.run(query, [room.name, room.capacity, room.description], function(err, row) {
            if (err) {
                if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
                    logger.error("Такая аудитория уже существует:", room.name)
                    res.send({warning: "Такая аудитория уже существует"});
                }
                else {
                    logger.error(query, ":", err);
                    res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
                }
            }
            else {
                logger.info("Обновлена аудитория:", room.name);
                res.send(true);
            }
        })
    }
}

var removeClassRoom = function(req, res) {
    if (req.session.user) {
        var room = req.body;
        database.all("SELECT * FROM Schedule WHERE idRoom = " + room.id, function(err, rows) {
            if (rows.length) {
                res.send({warning: "Нельзя удалить эту удиторию, т.к. в ней есть лекция в расписании"});
            }
            else {
            	var query = "DELETE FROM classRooms where id = " + room.id ;
            	
                database.run(query, function(err, row) {
                    if (err) {
                        logger.error(query, ":", err);
                        res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
                    }
                    else {
                    	logger.info("Удалена аудитория:", room.name);
                        res.send(true);
                    }
                })
            }
        });
    }
}

var getClassRooms = function(req, res) {
    if (req.session.user) {
    	var rooms = [];
    	
    	database.all("SELECT id, name, capacity, description FROM classRooms", function(err, rows) {
    	    if (err) {
                logger.error("GET all FROM classRooms", err);
    	    	res.send({error: "Ошибка сервера. Выполнить операцию не удалось"});
    	    }
            else {
                rows.forEach(function (row) {
                    room = new ClassRoom(row);
                    rooms.push(room);
                });
                res.send(rooms);
            }
    	});
    }
}

// получить только те аудитории, которые есть в расписании
var getClassRoomsFromShedule = function(req, res) {
    var schools = [];

    database.all("SELECT GROUP_CONCAT(idRoom) from Schedule" ,function(err, rows) {
        var ids = rows[0]["GROUP_CONCAT(idRoom)"];
        database.all("SELECT name, capacity, description FROM classRooms WHERE id in (" + ids + ")", function(err, rows) {
            if (err) {
                logger.error("GET Schools FROM Schedule", err)
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