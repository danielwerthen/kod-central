var fs = require('fs')
	, http = require('http')
	, path = require('path')
	, _ = require('underscore')
	, root = path.dirname(require.main.filename)
	, dir = path.join(root, '/signals')

http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write(dir);
	fs.readdir(dir, function (err, files) {
		res.write(JSON.stringify(_.keys(require.main)));
		res.end(JSON.stringify(files));
	});
}).listen(process.env.PORT || 3040);
