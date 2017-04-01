var logger = require('winston'),
	Lector = require('../models/lector');

exports.add = function(newLector, db, cb) {
	var query = "INSERT into Lectors (name, lastname, description) values (?, ?, ?)";
	db = db.connect();
    db.run(query, [newLector.name, newLector.lastname, newLector.description], function(err, row) {
        if (err) {
            if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
        		db.close();
        		logger.error("Такой лектор уже существует:", newLector.name, newLector.lastname)
            	return cb({error: "Такой лектор уже существует"});
            }
            else logger.error(err);
        }
        else {
        	logger.info("Добавлен лектор:", newLector.name, newLector.lastname);
        }
        db.close();
    })
}

exports.remove = function(lector, db, cb) {
	var query = "DELETE FROM Lectors where id = " + lector.id ;
	db = db.connect();
    db.run(query, function(err, row) {
        if (err) {
            logger.error(err);
        }
        else {
        	logger.info("Удален лектор:", lector.name, lector.lastname);
        }
        db.close();
    })
}

exports.getLectors = function(db, cb) {	
	var lectors = [];
	db = db.connect();
	db.all("SELECT id, name, lastname, description FROM Lectors", function(err, rows) {
	    if (err) {
			db.close();
	    	return err;
	    }
	    rows.forEach(function (row) {
	    	lector = new Lector(row);
	    	lector.fullname = lector.fullname();
	    	lectors.push(lector);
	    });
	    db.close();
	    return cb(lectors);
	});
}