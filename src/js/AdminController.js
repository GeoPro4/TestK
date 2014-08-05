app.controller('AdminController', function ($scope, $upload, $http, $timeout) {	
	$scope.selectedReviewIndex = 0;
	$scope.title = 'Admin Page';
	$scope.tag2Add = '';
	$scope.showModal = false;
	$scope.showPicModal = false;

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

	$scope.deleteTag = function(tag) {
		$http.delete('api/tags/' + tag._id).then(function() {
			console.log('tag deleted');
		});
	};

	$scope.editReview = function(index) {
		$scope.selectedReviewIndex = index;		
		showModal();	
	};

	$scope.getReviewDetails = function(review) {
		$http.get('api/Pictures/' + review.reviewId).then(function(results) {
			review.pics = [];
			review.pics = results.data;
		});

		$http.get('api/Tags/' + review.reviewId).then(function(results) {
			review.tags = [];
			review.tags = results.data;
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
		var toUpdate = JSON.stringify($scope.reviews[$scope.selectedReviewIndex]);
		console.log('starting update ...');

		$scope.loading = true;
	
		$http.put('api/reviews/' + $scope.reviews[$scope.selectedReviewIndex].reviewId, toUpdate).then(function() {
			console.log('updated');
			$scope.loading = false;
			$scope.showModal = false;
		});	
	};

	$scope.addTag = function() {
		console.log('adding tag ' + $scope.tag2Add);

		var model2Submit = {};
		model2Submit.tag = $scope.tag2Add;
		model2Submit.reviewId = $scope.reviews[$scope.selectedReviewIndex].reviewId;
	
		$http.post('api/tags/', JSON.stringify(model2Submit)).then(function() {
			console.log('tag added');

			if (!$scope.reviews[$scope.selectedReviewIndex].tags) {
				$scope.reviews[$scope.selectedReviewIndex].tags = {};
			}

			$scope.reviews[$scope.selectedReviewIndex].tags.push({'tag': $scope.tag2Add});
			$scope.tag2Add = '';
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