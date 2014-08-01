app.controller('AdminController', function ($scope, $upload, $http, $timeout) {	

	$scope.title = 'Admin Page';
	$scope.showModal = false;
	$scope.showPicModal = false;
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
		angular.copy(review, $scope.editReview);
		showModal();
	};

	$scope.getPics = function(review) {
		$http.get('api/Pictures/' + review.reviewId).then(function(results) {
			review.pics = [];
			review.pics = results.data;
		});
	};

	$scope.selectPic = function(pic) {
		$scope.showPicModal = false;

		$scope.bigPictureUrl = pic.imgPath;
		
		$timeout(function() {
			$scope.showPicModal = true;
		}, 0);
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

	var showModal = function() {
		$scope.showModal = false;
		$timeout(function() {
			$scope.showModal = true;
		}, 0);
	};

	init();	
});	