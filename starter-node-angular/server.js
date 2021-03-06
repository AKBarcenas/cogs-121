// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var http = require('http').Server(app);
var io = require('socket.io')(http)
// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// socket modules
//var http = require('http').Server(app);
//var io = require('socket.io')(http);

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes
io.on('connect',function(socket){
	console.log("A user has connected");
	socket.on('disconnect',function(){
		console.log("A user has disconnected");
	});
});
// start app ===============================================
http.listen(port,function(){
	console.log('Magic happens on port ' + port);
});	
 			// shoutout to the user
exports = module.exports = app; 						// expose app


// socket listener
/*io.on('connect', function(socket) {
   console.log('user connected');
   socket.on('disconnect', function() {
      console.log('user disconnected');
   });
});
*/
//http.listen(port, function() {
  // console.log('Magic happens on port ' + port);
   //console.log(process.env.PORT);
//});
