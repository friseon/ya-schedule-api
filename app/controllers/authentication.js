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
	var resultData = {};
	var query = "SELECT id, name, email from USERS where (login = '" + user.login + "' or email = '" + user.login + "') and password = '" + user.password + "'";
	database.all(query, function(err, rows) {
	    var selectedUser;
	    if (err) {
	    	logger.error('Вход пользователя', user.login, '- ошибка: ', err);
	    }
	    else if (rows && rows.length == 1) {
	    	selectedUser = rows[0];
	    	logger.info('Вход пользователя', user.login);
	    	req.session.user = selectedUser;

	    	resultData = {
		        result: true,
		        user: selectedUser
	     	}
	    }
	    else {
	    	logger.warn('Вход как', user.login, 'не удался - неверный логин или пароль'); 
	         
	    	resultData = {
	    		result: false,
		        warning: "Неверный логин или пароль"
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