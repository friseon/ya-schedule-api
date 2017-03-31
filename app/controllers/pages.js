exports.home = function (req, res) {
	res.render('home', {
		title: 'Home page',
		isAdmin: req.session ? !!req.session.user : false,
		message: 'This is the Home'
	})
}

exports.admin = function (req, res) {
	res.render('admin', {
		title: 'Admin page',
		isAdmin: req.session.user.admin,
		message: 'This is the Adminka!'
	})
}

exports.login = function (req, res) {
	return res.render('login', {
		title: 'Login page',
		message: req.message ? req.message : 'This is the Login'
	})
}