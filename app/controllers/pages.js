exports.home = function (req, res) {
	res.render('home', {
		title: 'Home page',
		isLogin: req.session ? !!req.session.user : false,
		message: 'This is the Home'
	})
}

exports.admin = function (req, res) {
	res.render('admin', {
		title: 'Admin page',
		isLogin: req.session ? !!req.session.user : false,
		message: 'This is the Adminka!'
	})
}