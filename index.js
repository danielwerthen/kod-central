var Flux = require('flux')
	, http = require('http')
	, _ = require('underscore')
	, express = require('express')
	, app = express()
	, se = require('./signalExtender')

var flux = new Flux();

app.use(flux.duplex());
app.use(express.bodyParser());

var node = flux.createNode('Central');
se.register(flux);
//Proxied supposedly
//flux.addRemoteNode({ url: "http://192.168.1.110:3000", protocol: "duplex" }, "Kv", "Knx" );

node.addFunction('Print', function (data, cb) {
	console.dir(data);
	cb(data);
});

node.addFunction('Period', function (interval, cb) {
	setInterval(function () {
		cb();
	}, interval);
});

node.addFunction('Map', function (arr, cb) {
	for (var i in arr) {
		cb(arr[i]);
	}
});

node.addFunction('Random', function (cb) {
	cb(Math.random());
});

node.addFunction('Proxy', function (data, cb) {
	cb(data);
});

var values = {};
node.addFunction('Publish', function (path, value, cb) {
	console.log("Received: " + value);
	values[path] = value;
	cb();
});

var listeners = {};
node.addFunction('Listen', function (url, cb) {
	listeners[url] = function (req, res) {
		cb(req.body.value, new Date());
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end("{ result: 'OK' }");
	};
	/*var id = 0;
	var interv = setInterval(function () {
		cb(id++, new Date());
	}, 100);
	this.on('stop', function () {
		console.log('stop');
		clearInterval(interv);
	});*/
});

node.addFunction('Route', function  (url, val, dt, cb) {
	console.log('Url: ' + url + ' value: ' + val + ' time: ' + dt);
});

app.use(function (req, res, next) {
	if (req.method === 'GET' && values[req.url]) {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(values[req.url]));
	}
	else if (req.method === 'POST' && listeners[req.url]) {
		listeners[req.url](req, res);
	}
	else
		next();
});

flux.start();
console.log('Central is running');
app.listen(process.env.PORT || 3000);
console.log('Listening on port ' + (process.env.PORT || 3000));
