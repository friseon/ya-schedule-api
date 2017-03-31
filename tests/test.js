// test start server

var request = require('supertest'),
	app = require(__dirname + '/../app')

describe('User tests: ', function () {
	it('if USER is null should redirect to LOGIN', function (done) {
	    request(app)
	       .get('/')
	       .expect('location', '/login')
	       .expect(302, done)
	});

	it('USER login', function(done){
	  	request(app)
	  		.post('/login')
		    .send({
		    	login: "qwe",
		    	name: "qwe",
		    	email: "qwe",
		    	password: "qwe"
		    })
		    .end(function(err, res) {
		    	res.body.result.should.equal(true);
		     	done(err);
		    });
	})

	it('USER login false', function(done){
	  	request(app)
	  		.post('/login')
		    .send({
		    	login: "qwrqwrwqrr",
		    	name: "qwe",
		    	email: "qwe",
		    	password: "43334"
		    })
		    .end(function(err, res) {
		    	res.body.result.should.equal(false);
		     	done(err);
		    });
	})
})