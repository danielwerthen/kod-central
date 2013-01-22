var fs = require('fs')
	, http = require('http')
	, path = require('path')
	, root = path.dirname(require.main.filename)
	, dir = root + '/signals'

http.createServer(function (req, res) {
	fs.readdir(dir, function (err, files) {
		res.end(JSON.stringify(files));
	});
}).listen(process.env.PORT || 3040);
