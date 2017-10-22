angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/courses', {
			templateUrl: 'views/course.html',
			controller: 'CourseController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})

		.when('/reservation/:course_id', {
			templateUrl: 'views/reservation.html',
			controller: 'ReservationController'
		});

	$locationProvider.html5Mode(true);

}]);