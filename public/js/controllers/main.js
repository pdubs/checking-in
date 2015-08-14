angular.module('checkinController', ['ngGeolocation'])
	.controller('mainController', ['$geolocation','$scope','$http','Checkins', function($geolocation, $scope, $http, Checkins) {
		$scope.checkinData = {};
		$scope.loading = true;

		Checkins.get()
			.success(function(data) {
				$scope.checkins = data;
				$scope.loading = false;
			});

		$scope.createCheckin = function() {
			var time = new Date();
			if ($scope.checkinData.text != undefined) {
				$scope.loading = true;
				$geolocation.getCurrentPosition({
					timeout: 60000
				}).then(function(position) {
					$scope.myPosition = position;
					$scope.checkinData.lat = $scope.myPosition.coords.latitude;
					$scope.checkinData.lon = $scope.myPosition.coords.longitude;
					$scope.checkinData.time = (time.getMonth() + "/" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());

					Checkins.create($scope.checkinData)
						.success(function(data) {
							$scope.loading = false;
							$scope.checkinData = {};
							$scope.checkins = data;
						});
				});
			}
		};

		$scope.deleteCheckin = function(id) {
			$scope.loading = true;

			Checkins.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.checkins = data;
				});
		};
	}]);