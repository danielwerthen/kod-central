var fs = require('fs')
	, http = require('http')
	, path = require('path')
	, _ = require('underscore')
	, root = __dirname
	, dir = path.join(root, '/signals')

http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write(dir);
	fs.readdir(root, function (err, files) {
		res.write(JSON.stringify(_.keys(require.main)));
		res.write(JSON.stringify(_.keys(require.main.children)));
		res.end(JSON.stringify(files));
	});
}).listen(process.env.PORT || 3040);
