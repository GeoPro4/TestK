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
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

     $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
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