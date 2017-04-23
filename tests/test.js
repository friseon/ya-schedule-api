// test start server

var request = require('supertest'),
	app = require(__dirname + './../app/app')

describe('User tests: ', function () {

	it('if USER is null should from ADMIN redirect to LOGIN', function (done) {
	    request(app)
	    	.get('/admin')
	    	.expect('location', '/login')
	    	.expect(302, done)
	});

	it('USER login', function(done){
	  	request(app)
	  		.post('/login')
		    .send({
		    	login: "admin",
		    	password: "qwe123"
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
		    	password: "43334"
		    })
		    .end(function(err, res) {
		    	res.body.result.should.equal(false);
		     	done(err);
		    });
	})
})