var logger = require('winston'),
    database = require('./../db').database,
	Lector = require('../models/lector');

// Routes
module.exports = function(app) {
    app.post('/addLector', add);
    app.post('/removeLector',remove);
    app.get('/getLectors', getAll); 
};

// Controlls
add = function(req, res) {
    if (req.session.user) {
        var newLector = new Lector(req.body);
    	var query = "INSERT into Lectors (name, lastname, description) values (?, ?, ?)";
    	
        database.run(query, [newLector.name, newLector.lastname, newLector.description], function(err, row) {
            if (err) {
                if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
            		logger.error("Такой лектор уже существует:", newLector.name, newLector.lastname)
                	res.send({error: "Такой лектор уже существует"});
                }
                else logger.error(err);
            }
            else {
            	logger.info("Добавлен лектор:", newLector.name, newLector.lastname);
                res.send(true);
            }
        })
    }
}

remove = function(req, res) {
    var lector = new Lector(req.body);
	var query = "DELETE FROM Lectors where id = " + lector.id ;
	
    database.run(query, function(err, row) {
        if (err) {
            logger.error(err);
            res.send(err);
        }
        else {
        	logger.info("Удален лектор:", lector.name, lector.lastname);
        }
        res.send(true);
    })
}

getAll = function(req, res) {	
	var lectors = [];
	
	database.all("SELECT id, name, lastname, description FROM Lectors", function(err, rows) {
	    if (err) {
            logger.error(err);
	    	res.send(err);
	    }
	    rows.forEach(function (row) {
	    	lector = new Lector(row);
	    	lector.fullname = lector.fullname();
	    	lectors.push(lector);
	    });
	    res.send(lectors);
	});
}