exports.home = function (req, res) {
	res.render('home', {
		title: 'Главная',
		isLogin: req.session ? !!req.session.user : false
	})
}

exports.admin = function (req, res) {
	res.render('admin', {
		title: 'Администрирование',
		isLogin: req.session ? !!req.session.user : false
	})
}