var app = angular.module('testApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

app.controller('NavController', function($scope, $location) {
	$scope.navClass = function (page) {
		var currentRoute = $location.path().substring(1) || 'home';
		return page === currentRoute ? 'active' : '';
	};
});

app.config(function ($routeProvider) {
    $routeProvider
    	.when('/',
		{
			controller: 'HomeController',
			templateUrl: 'templates/home.html'
		})
		.when('/page2',
		{
			controller: 'Page2Controller',
			templateUrl: 'templates/page2.html'
		});
});

