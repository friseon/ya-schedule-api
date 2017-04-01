var logger = require('winston');

exports.add = function(newSchool, db, cb) {
	var query = "INSERT into Schools (name, students) values (?, ?)";
	db = db.connect();
    db.run(query, [newSchool.name, newSchool.students], function(err, row) {
        if (err) {
            if (err.toString().indexOf('UNIQUE constraint failed') >= 0) {
        		db.close();
        		logger.error("Такая школа уже существует:", newSchool.name)
            	return cb({error: "Такая школа уже существует"});
            }
            else logger.error(err);
        }
        else {
        	logger.info("Добавлена школа:", newSchool.name);
        }
        db.close();
        return cb(true);
    })
}

exports.remove = function(school, db, cb) {
	var query = "DELETE FROM Schools where id = " + school.id ;
	db = db.connect();
    db.run(query, function(err, row) {
        if (err) {
            logger.error(err);
            return cb(err);
        }
        else {
        	logger.info("Удалена школа:", school.name, school.lastname);
        }
        db.close();
        return cb(true);
    })
}

exports.getSchools = function(db, cb) {	
	var schools = [];
	db = db.connect();
	db.all("SELECT id, name, students FROM Schools", function(err, rows) {
	    if (err) {
			db.close();
	    	return err;
	    }
	    rows.forEach(function (row) {
	    	school = new School(row);
	    	schools.push(school);
	    });
	    db.close();
	    return cb(schools);
	});
}