app.controller('AdminController', function ($scope, $upload, $http, $timeout) {	

	$scope.title = 'Admin Page';
	$scope.showModal = false;
	$scope.editReview = {};

	var init = function() {
		getReviewsData();
	};

	var getReviewsData = function() {
		$http.get('api/reviews').then(function(result) {
			$scope.reviews = result.data;
		});
	};

	$scope.deleteReview = function(review) {
		$http.delete('api/reviews/' + review._id).then(function() {
			console.log('deleted');
			getReviewsData();
		});
	};

	$scope.editReview = function(review) {
		console.log('edit click ' + JSON.stringify(review));

		console.log('1 $scope.editReview ' + JSON.stringify($scope.editReview));

		$scope.editReview = {};
		console.log('2 $scope.editReview ' + JSON.stringify($scope.editReview));
		
		//$scope.editReview = review;
		//console.log('3 $scope.editReview ' + JSON.stringify($scope.editReview));

		$scope.showModal = true;
	};

	$scope.updateReview = function() {
		console.log('starting update');
		$scope.loading = true;
		
		$http.put('api/reviews/' + $scope.editReview.reviewId, JSON.stringify($scope.editReview)).then(function() {
			console.log('updated');
			$scope.loading = false;
			$scope.showModal = false;
		});		
	};

	init();	
});	