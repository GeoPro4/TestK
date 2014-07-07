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
