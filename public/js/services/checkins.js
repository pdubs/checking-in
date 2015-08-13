angular.module('checkinService', [])
	.factory('Checkins', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('http://localhost:8095/api/checkins');
			},
			create : function(checkinData) {
				return $http.post('http://localhost:8095/api/checkins/', checkinData);
			},
			delete : function(id) {
				return $http.delete('http://localhost:8095/api/checkins/' + id);
			}
		}
	}]);