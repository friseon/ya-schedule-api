var logger = require('winston'),
    database = require('./../db').database,
	classRoom = require('../models/classRoom');

// Routes
module.exports = function(app) {
    app.post('/addClassRoom', addClassRoom);
    app.post('/updateClassRoom', updateClassRoom);
    app.post('/removeClassRoom',removeClassRoom);
    app.get('/getClassRooms', getClassRooms); 
};

// Controlls
var addClassRoom = function(req, res) {
    if (req.session.user) {
        var newRoom = req.body;
    	var query = "INSERT into classRooms (name, capacity, description) values (?, ?, ?)";
    	
        database.run(query, [newRoom.name, newRoom.capacity, newRoom.description], function(err, row) {
            if (err) {
                if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
            		logger.error("Такая аудитория уже существует:", newRoom.name)
                	res.send({error: "Такая аудитория уже существует"});
                }
                else {
                    logger.error(query, ":", err);
                    res.send({error: "Ошибка сервера. Выполнить операцию не удалось."});
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
                    res.send({error: "Такая аудитория уже существует"});
                }
                else {
                    logger.error(query, ":", err);
                    res.send({error: "Ошибка сервера. Выполнить операцию не удалось."});
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
    	var query = "DELETE FROM classRooms where id = " + room.id ;
    	
        database.run(query, function(err, row) {
            if (err) {
                logger.error(query, ":", err);
                res.send({error: "Ошибка сервера. Выполнить операцию не удалось."});
            }
            else {
            	logger.info("Удалена аудитория:", room.name);
                res.send(true);
            }
        })
    }
}

var getClassRooms = function(req, res) {
    if (req.session.user) {
    	var rooms = [];
    	
    	database.all("SELECT id, name, capacity, description FROM classRooms", function(err, rows) {
    	    if (err) {
                logger.error("GET all FROM classRooms", err);
    	    	res.send({error: "Ошибка сервера. Выполнить операцию не удалось."});
    	    }
            else {
                rows.forEach(function (row) {
                    room = new classRoom(row);
                    rooms.push(room);
                });
                res.send(rooms);
            }
    	});
    }
}