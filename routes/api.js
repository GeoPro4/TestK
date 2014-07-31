var mongodb = require('mongodb');
var fs = require('fs');
var moment = require('moment');
var _ = require('underscore');

exports.GetId = function(db) { 
  return function(req, res) {
  	var date = moment().format("YYYY-MM-DD_HHmmss");

  	console.log('getting date: ' + date);

	res.writeHead(200, { 'Content-Type': 'application/json' });	
	res.end(JSON.stringify(date));
  }
};

exports.GetUsers = function(db) { 
  return function(req, res) {  
	res.writeHead(200, { 'Content-Type': 'application/json' });	
	db.users.find().toArray(function(err, mes) {
		if( err || !mes) console.log("No pics found");
			res.end(JSON.stringify(mes));
	});
  }
};

exports.AddUser = function(db) { 
  return function(req, res) {

		var date = new Date();
		
		var ipAddr = req.headers["x-forwarded-for"];
		if (ipAddr){
			var list = ipAddr.split(",");
			ipAddr = list[list.length-1];
		} else {
			ipAddr = req.connection.remoteAddress;
		}
	
		db.users.insert({'userFirstName': req.body.userFirstName, 
							'userLastName': req.body.userLastName,
							'dateAdded': date,
							'ipAddr': ipAddr}, (function(err, mes) {
			if( err || !mes) {
				console.log("review not saved: " + mes);
				res.writeHead(500, { 'Content-Type': 'application/json' });	
			} else {
				res.writeHead(200, { 'Content-Type': 'application/json' });				
			}

			res.end();
		}));
  }
};

exports.GetPic = function(db) {
  return function(req, res) {

  	file = req.params.file;
  	console.log('getting file: ');
	var img = fs.readFileSync( __dirname + "/../uploads/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

  }
};

/*
----------------------------
----      Reviews       ----
-----------------------------
*/

exports.GetReviews = function(db) { 
  return function(req, res) {  

	db.reviews.find().toArray(function(err, result) {			

		if( err || !result) {
			console.log("No reviews found, error:  " + result);
			res.writeHead(500, { 'Content-Type': 'application/json' });	
			res.end();
		} else {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(result));			
		}
	});
  }
};

exports.GetReview = function(db) { 
  return function(req, res) { 

  	var reviewId = req.params.reviewId;

  	console.log('getting review ... ' + reviewId);

	db.reviews.find({'reviewId': reviewId}).toArray(function(err, result) {			

		if( err || !result) {
			console.log("No reviews found, error:  " + result);
			res.writeHead(500, { 'Content-Type': 'application/json' });	
			res.end();
		} else {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(result));			
		}
	});
  }
};

exports.UpdateReview = function(db) { 
  return function(req, res) { 

  	var reviewId = req.params.reviewId;
  	console.log('updating review ... ' + reviewId);

  	db.reviews.update({'reviewId': reviewId}, {$set: {'rating': req.body.rating,
  													  'reviewName': req.body.reviewName,
  													  'reviewText': req.body.reviewText}}, function(err, result) {
  		if( err || !result) {
			console.log("Error updating:  " + result);
			res.writeHead(500, { 'Content-Type': 'application/json' });	
			res.end();
		} else {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(result));			
		}
  	});
  }
};

exports.AddReview = function(db) { 
  return function(req, res) {

		var date = new Date();

		var ipAddr = req.headers["x-forwarded-for"];
		if (ipAddr){
			var list = ipAddr.split(",");
			ipAddr = list[list.length-1];
		} else {
			ipAddr = req.connection.remoteAddress;
		}
	
		db.reviews.insert({'reviewName': req.body.reviewName, 
							'reviewText': req.body.reviewText,
							'rating': req.body.rating,
							'mainPicUrl': req.body.mainPicUrl,
							'dateAdded': date,
							'reviewId': req.body.reviewId,
							'ipAddr': ipAddr}, (function(err, mes) {
			if( err || !mes) {
				console.log("review not saved: " + mes);
				res.writeHead(500, { 'Content-Type': 'application/json' });	
			} else {
				res.writeHead(200, { 'Content-Type': 'application/json' });				
			}

			res.end();
		}));
  }
};

exports.DeleteReview = function(db) { 
  return function(req, res) {

	var reviewId = req.params.reviewId;	
	console.log('deleting review ' + reviewId);

	db.reviews.remove({_id: new mongodb.ObjectID(reviewId)});

	res.writeHead(200, { 'Content-Type': 'application/json' });	
	res.end();
  }
};