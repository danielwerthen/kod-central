var http = require('http')
	, fs = require('fs')
	, path = require('path')
	, root = __dirname

http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	fs.readdir(path.join(root, '/signals'), function (err, files) {
		res.write(JSON.stringify(err));
		res.end(JSON.stringify(files));
	});
}).listen(process.env.PORT || 3040);

