var http = require('http')
	, fs = require('fs')
	, path = require('path')
	, root = __dirname

http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	fs.readdir(path.join(root, '/signals'), function (err, files) {
		fs.readFile(path.join(root, '/signals', files[0]), 'UTF-8', function (err, data) {
			res.write(JSON.stringify(err));
			res.end(data);
		});
	});
}).listen(process.env.PORT || 3040);

