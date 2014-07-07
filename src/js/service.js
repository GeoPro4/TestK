app.factory('testService', function($http) {
    return {
	   	getUsers: function() {
	       return $http.get('/api/users').then( function (results) {			
				return results.data;
			});
	    }
	};
});