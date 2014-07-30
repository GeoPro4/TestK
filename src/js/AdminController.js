app.controller('AdminController', function ($scope, $upload, $http) {	

	$scope.title = 'Admin Page';

	var init = function() {
		getReviewsData();
	};

	var getReviewsData = function() {
		$http.get('api/reviews').then(function(result) {
			$scope.reviews = result.data;
		});
	};

	init();	
});	