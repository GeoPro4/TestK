
var express = require('express');
var http = require('http');
var path = require('path');
var api = require('./routes/api');

// 4.0 stuff
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');

var fs = require('fs');

var databaseUrl = "testDB";
var collections = ["users", "pics", "reviews", "rtags"]
var db = require("mongojs").connect(databaseUrl, collections);

var app = express();

var multipartMiddleware = multipart();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev')); 
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
  res.sendfile("dist/index.html");
});

app.get('/api/users', api.GetUsers(db));
app.post('/api/users', api.AddUser(db));

app.get('/api/Reviews', api.GetReviews(db));
app.get('/api/Reviews/:reviewId', api.GetReview(db));
app.put('/api/Reviews/:reviewId', api.UpdateReview(db));
app.post('/api/Reviews', api.AddReview(db));
app.delete('/api/Reviews/:reviewId', api.DeleteReview(db));

app.get('/api/Tags', api.GetTags(db));
app.get('/api/Tags/:reviewId', api.GetTag(db));
app.post('/api/Tags', api.AddTag(db));
app.delete('/api/Tags/:tagId', api.DeleteTag(db));

app.get('/api/Pictures/:reviewId', api.GetPictures(db));
app.get('/uploads/:file', api.GetPic(db));

/// Post files
app.post('/upload', multipartMiddleware, function(req, res) {

	var date = new Date();

	fs.readFile(req.files.file.path, function (err, data) {

		var picNum = req.body.picNum;
		var reviewId = req.body.reviewId;
				
		var orgImageName = req.files.file.originalFilename;
		var orgImagePath = req.files.file.path;

		var fileExtension = orgImageName.slice(-4);
		if (fileExtension.charAt(0) === '.') {
			// good
		} else {
			fileExtension = orgImageName.slice(-5);

			if (!fileExtension.charAt(0) === '.') {
				console.log('!!!! error getting the file extension !!!! ' + fileExtension)
			}
		}		

		var imageName = reviewId + '_pic_' + picNum + fileExtension;
		var serverPath =  __dirname + "/uploads/" + imageName;
		var imgPath = '/uploads/' + imageName;

		/*console.log('-----------------');
		console.log('picNum ' + picNum);	
		console.log('reviewId ' + reviewId);	
		console.log('orgImageName ' + orgImageName);	
		console.log('orgImagePath ' + orgImagePath);	
		console.log('imageName ' + imageName);	
		console.log('-----------------');*/

		var ipAddr = req.headers["x-forwarded-for"];
		if (ipAddr){
			var list = ipAddr.split(",");
			ipAddr = list[list.length-1];
		} else {
			ipAddr = req.connection.remoteAddress;
		}

		/// write file to uploads folder
		fs.writeFile(serverPath, data, function (err) {		

			console.log('file uploaded and saved  - ' + orgImageName);	
		
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
	});	
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
