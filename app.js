
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var api = require('./routes/api');

var fs = require('fs');

var databaseUrl = "testDB";
var collections = ["users", "pics"]
var db = require("mongojs").connect(databaseUrl, collections);

var app = express();

app.configure(function () {
  app.use(express.bodyParser());
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'dist')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
app.get('/', function(req, res) {
  res.sendfile("dist/index.html");
});

app.get('/api/users', api.GetUsers(db));
app.post('/api/users', api.AddUser(db));

/// Post files
app.post('/upload', function(req, res) {

	var date = new Date();

	console.log('files: ' + JSON.stringify(req.files));

	/*fs.readFile(req.files.file.path, function (err, data) {

		var picNum = req.body.picNum;
		var reviewId = req.body.reviewId;
		console.log('p: ' + picNum + " reviewId: " + reviewId);
		
		var orgImageName = req.files.file.name;
		var orgImagePath = req.files.file.path;
		var fileExtension = orgImageName.slice(-4);

		var imageName = reviewId + '_pic_' + picNum + fileExtension;
		var serverPath =  __dirname + "/public/uploads/" + imageName;
		var imgPath = '/uploads/' + imageName;

		var ipAddr = req.headers["x-forwarded-for"];
		if (ipAddr){
			var list = ipAddr.split(",");
			ipAddr = list[list.length-1];
		} else {
			ipAddr = req.connection.remoteAddress;
		}

		/// write file to uploads folder
		fs.writeFile(serverPath, data, function (err) {			
		
			db.pics.insert({'reviewId': reviewId,
							'imgName': imageName, 
							'imgPath': imgPath, 
							'dateAdded': date, 
							'orgImageName': orgImageName,
							'orgImagePath': orgImagePath,
							'ipAddr': ipAddr}, (function(err, mes) {
							if( err || !mes) console.log("pic not saved");
						}));

			res.json({'orgImageName': orgImageName, 'imgName': imageName, 'imgPath': imgPath});
			res.end();
		});
	});	*/
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
