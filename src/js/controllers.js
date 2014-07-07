app.controller('HomeController', function ($scope, $timeout, testService, $http) {
	
    $scope.messageType = {};
	$scope.currentNum = -1;
	$scope.number2dial = '';

    function getUsers() {
    	testService.getUsers().then(function(data) {
	       $scope.users = data;
	       console.log(data);
	   	});
    }

    function init() {
    	getUsers();
		$scope.name = "Geo";
    }
	
	$scope.submitUser = function() {
		console.log('submiting....');
		$http.post('/api/users', JSON.stringify($scope.m2s))
			.then(function(data) {				
				console.log('added');
				getUsers();
			});
	};

	$scope.clickNum = function (num) {
		$scope.currentNum = num;
		$scope.number2dial = $scope.number2dial + num;
	};

    init();

});


app.controller('Page2Controller', function ($scope, $timeout, testService, $http) {
	$scope.myInterval = 5000;

	var slides = $scope.slides = [];

	$scope.addSlide = function() {
		var newWidth = 600 + slides.length;
		slides.push({
			image: 'http://placekitten.com/' + newWidth + '/300',
			text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
			['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
		});
	};

	for (var i=0; i<4; i++) {
		$scope.addSlide();
	}

	$scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
        	left: 'prev',
			center: 'title',
			right: 'next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

    $scope.eventSource = [
		{
		  "title" : "\n\nL 3-2",
		  "start" : "2014-07-13 10:20:00",
		  "end" : "2014-07-13 11:00:00",
		  "allDay" : false,
		  "className" : "psb",
		  "type": "game"			  
		},
		{
		  "title" : "\n\nW 5-4",
		  "start" : "2014-07-11 10:20:00",
		  "end" : "2014-07-11 11:00:00",
		  "allDay" : false,
		  "className" : "preds",
		  "type": "game"		  
		},
		{
		  "title" : "\n7:00pm",
		  "start" : "2014-07-25 10:20:00",
		  "end" : "2014-07-25 11:00:00",
		  "allDay" : false,
		  "className" : "teamPurple",
		  "type" : "game"
		},
		{
		  "title" : "\n7:30pm",
		  "start" : "2014-07-27 10:20:00",
		  "end" : "2014-07-27 11:00:00",
		  "allDay" : false,
		  "className" : "game",
		  "type" : "game"
		}
	];

    $scope.alertEventOnClick = function (data) {
    	console.log('click on cal: ' + data);
    };

 });

app.controller('MainController', function ($scope) {
	
	$scope.name = 'Ari';
	$scope.blah = true;
    	
	$scope.sayHello = function() {
		$scope.greeting = 'Hello ' + $scope.name;
	};

});

app.directive('setNgAnimate', ['$animate', function ($animate) {
    return {
        link: function ($scope, $element, $attrs) {
            $scope.$watch( function() {
                return $scope.$eval($attrs.setNgAnimate, $scope);
            }, function(valnew, valold){
                console.log('Directive animation Enabled: ' + valnew);
                $animate.enabled(!!valnew, $element);
            });
        }
    };
}]);