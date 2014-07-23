app.controller('AddReviewController', function ($scope, $upload) {	
	$scope.name = 'Geo2';
	$scope.numOfStars = 5;
	var picNum = 0;

	$scope.newFormData = {};
	$scope.newFormData.reviewId = 1;

	$scope.submitForm = function(review) {
		console.log('adding review...');

		$http.post('/api/Reviews', JSON.stringify($scope.newFormData))
			.then(function(data) {				
				console.log('added');
				delete $scope.newFormData;
				$scope.newFormData = {};
				//getReviews();
			});
	};

	$scope.onFileSelect = function($files) {
		
		  var file = $files[0];

		  picNum++;
		  
		  $scope.upload = $upload.upload({
			url: '/upload', 			
			data: {'picNum': picNum, 'reviewId': $scope.newFormData.revieId },
			file: file,
		  }).success(function(data, status, headers, config) {
		  	console.log('data: ' + JSON.stringify(data));
			$scope.newFormData.reviewPics.push(data);			
			$scope.pictures.push(data);			
			$files = [];
		  });
	};


});