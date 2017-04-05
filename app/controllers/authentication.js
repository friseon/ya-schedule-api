var logger = require('winston'),
    database = require('./../db').database;

// Routes
module.exports = function(app) {
    app.post('/login', login);
    app.post('/logout', logout); 
};

// Controlls

login = function(req, res) {
	var user = req.body;
	var query = "SELECT id, name, email, admin from USERS where (login = '" + user.login + "' or email = '" + user.login + "') and password = '" + user.password + "'";
	database.all(query, function(err, rows) {
	    var result;
	    var error;
	    var selectedUser;
	    if (err) {
	    	result = false;
	    	error = err;
	    	logger.error('Вход пользователя', user.login, '- ошибка: ', err);
	    }
	    if (rows && rows.length == 1) {
	    	result = true;
	    	selectedUser = rows[0];
	    	logger.info('Вход пользователя', user.login);
	    	req.session.user = selectedUser;

	    	resultData = {
		        'result': result,
		        'message': error,
		        'user': selectedUser
	     	}
	    } else {
	    	result = false;
	    	error = "Неверный логин или пароль";
	    	logger.warn('Вход как', user.login, 'не удался - неверный логин или пароль'); 
	         
	    	resultData = {
		        'result': result,
		        'message': error
	    	}
	    }
	    res.send(resultData);
	});
};

logout = function(req, res) {
	logger.info("Выход пользователя", req.session.user);
	req.session.destroy();
  	res.redirect('/');
};