// Main file. Start app

var http = require('http'),
    express = require('express');

var Application = require(__dirname + '/app');
var DatabaseParams = require(__dirname + '/app/db').DatabaseParams;

var port = process.env.PORT || 9250;
var host = process.env.HOST || "127.0.0.1";

var server = http.createServer(Application).listen(port, host, function() {
	DatabaseParams.initDB();
	console.log("Server listening to %s:%d within %s environment", host, port, Application.get('env'));
});
