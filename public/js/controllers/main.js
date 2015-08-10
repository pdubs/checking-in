angular.module('checkinController', ['ngGeolocation'])

	// inject the Checkin service factory into our controller
	.controller('mainController', ['$geolocation','$scope','$http','Checkins', function($geolocation, $scope, $http, Checkins) {
		$scope.checkinData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all checkins and show them
		// use the service to get all the checkins
		Checkins.get()
			.success(function(data) {
				$scope.checkins = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createCheckin = function() {
			var time = new Date();
			// validate the checkinData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.checkinData.text != undefined) {

				$scope.loading = true;

				$geolocation.getCurrentPosition({
					timeout: 60000
				}).then(function(position) {
					$scope.myPosition = position;

					$scope.checkinData.lat = $scope.myPosition.coords.latitude;
					$scope.checkinData.lon = $scope.myPosition.coords.longitude;

					$scope.checkinData.time = (time.getMonth() + "/" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());

					// call the create function from our service (returns a promise object)
					Checkins.create($scope.checkinData)

						// if successful creation, call our get function to get all the new checkins
						.success(function(data) {
							$scope.loading = false;
							$scope.checkinData = {}; // clear the form so our user is ready to enter another
							$scope.checkins = data; // assign our new list of checkins
						});
				});
			}
		};

		// DELETE ==================================================================
		// delete a checkin after checking it
		$scope.deleteCheckin = function(id) {
			$scope.loading = true;

			Checkins.delete(id)
				// if successful creation, call our get function to get all the new checkins
				.success(function(data) {
					$scope.loading = false;
					$scope.checkins = data; // assign our new list of checkins
				});
		};
	}]);