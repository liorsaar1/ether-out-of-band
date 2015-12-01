// Load the node-router library by creationix

var Router = require('node-router');
var router = Router();
var route = router.push;

route(function (req, res, next) {
	console.log('----------------------------------------');
	console.log('req.path: ' + req.path);
	console.log('req.query: ' + JSON.stringify(req.query));
	next();
});


// var server = require('node-router').getServer();

// // Configure our HTTP server to respond with Hello World the root request
// server.get("/", function (request, response) {
//   response.simpleText(200, "Hello World!");
// });

// // Listen on port 8080 on localhost
// server.listen(8080, "localhost");