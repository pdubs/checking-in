angular.module('checkinService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Checkins', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/checkins');
			},
			create : function(checkinData) {
				return $http.post('/api/checkins', checkinData);
			},
			delete : function(id) {
				return $http.delete('/api/checkins/' + id);
			}
		}
	}]);