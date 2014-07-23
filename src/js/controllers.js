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
        editable: false,
        header:{
        	left: 'prev',
			center: 'title',
			right: 'next'
        },
        events: [
	        {
			      "title" : "\n\nL 3-2",
				  "start" : "2014-07-13",
				  "className" : "psb",
			},
			{
				  "title" : "\n\nW 5-4",
				  "start" : "2014-07-11 ",
				  "className" : "preds",	  
			}
	    ],
	    dayClick: function(data) {
	    	alert('click event' + JSON.stringify(data));
	    },
	    viewRender: function(view, element) {
            console.log("View Changed: ", view.visStart, view.visEnd, view.start, view.end);
        }
      }
    };

    $scope.customEvents = [
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
 });

app.controller('MainController', function ($scope) {
	
	$scope.name = 'Ari';
	$scope.blah = true;
    	
	$scope.sayHello = function() {
		$scope.greeting = 'Hello ' + $scope.name;
	};

});

app.controller('BlogController', function ($scope) {	
	$scope.name = 'Geo';
});

app.controller('ReviewsController', function ($scope, $upload) {	
	$scope.name = 'Geo';
	$scope.numOfStars = 5;

	$scope.reviews = [
		{
			'title': 'story 1', 
			'imgUrl': 'img/new_stang.jpg',
			'storyText': 'You ought to be ashamed of yourself for asking such a simple question, added the Gryphon; and then they both sat silent and looked at poor Alice, who felt ready to sink into the earth. At last the Gryphon said to the Mock Turtle, Drive on, old fellow! Dont be all day about it! and he went on in these words: Yes, we went to school in the sea, though you maynt believe it— I never said I didnt!nterrupted Alice. You did,said the Mock Turtle.',
			'date': '2012-08-02 20:47:04',
			'rating': 4
		},
		{
			'title': 'story 2', 
			'imgUrl': 'img/stang.jpg',
			'storyText': 'You ought to be ashamed of yourself for asking such a simple question, added the Gryphon; and then they both sat silent and looked at poor Alice, who felt ready to sink into the earth. At last the Gryphon said to the Mock Turtle, Drive on, old fellow! Dont be all day about it! and he went on in these words: Yes, we went to school in the sea, though you maynt believe it— I never said I didnt!nterrupted Alice. You did,said the Mock Turtle.',
			'date': '2012-08-12 20:47:04',
			'rating': 3
		}
	];
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