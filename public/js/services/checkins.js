angular.module('checkinService', [])
	.factory('Checkins', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('http://pdubs.gyges.feralhosting.com:8095/api/checkins');
			},
			create : function(checkinData) {
				return $http.post('http://pdubs.gyges.feralhosting.com:8095/api/checkins/', checkinData);
			},
			delete : function(id) {
				return $http.delete('http://pdubs.gyges.feralhosting.com:8095/api/checkins/' + id);
			}
		}
	}]);