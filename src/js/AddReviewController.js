app.controller('AddReviewController', function ($scope, $upload, $http) {	
	$scope.name = 'Geo2';
	$scope.numOfStars = 5;
	$scope.pictures = [];
	var picNum = 0;

	$scope.newFormData = {};
	$scope.newFormData.reviewPics = [];

	var init = function() {
		$scope.newFormData.reviewId = moment().format("YYYYMMDDHHmmss");
	};

	$scope.submitForm = function(review) {
		console.log('adding review...');

		$http.post('/api/Reviews', JSON.stringify($scope.newFormData))
			.then(function(data) {				
				console.log('added');
				delete $scope.newFormData;
				$scope.newFormData = {};
			});
	};

	$scope.onFileSelect = function($files) {
		
		  var file = $files[0];

		  picNum++;

		  console.log('onfile select picNum:' + picNum + ", reviewId: " + $scope.newFormData.reviewId);
		  
		  $scope.upload = $upload.upload({
			url: '/upload', 			
			data: {'picNum': picNum, 'reviewId': $scope.newFormData.reviewId },
			file: file,
		  }).success(function(data, status, headers, config) {
		  	console.log('data: ' + JSON.stringify(data));
			$scope.newFormData.reviewPics.push(data);			
			$scope.pictures.push(data);			
			$files = [];

			if (picNum	=== 1) {
				$scope.newFormData.mainPicUrl = data.imgPath;
			}

		  });
	};

	$scope.submitForm = function() {
		console.log('adding review...');

		$http.post('/api/Reviews', JSON.stringify($scope.newFormData))
			.then(function(data) {				
				console.log('added');
				delete $scope.newFormData;
				$scope.newFormData = {};
				//getReviews();
			});
	};

	init();
	
});