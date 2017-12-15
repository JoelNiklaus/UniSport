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

		.when('/aboutus', {
			templateUrl: 'views/aboutus.html',
			controller: 'AboutUsController'	
		})

		.when('/faq', {
			templateUrl: 'views/faq.html',
			controller: 'FaqController'
		})

		.when('/contact', {
			templateUrl: 'views/contact.html',
			controller: 'ContactController'
		})

		.when('/reservation/:course_id', {
			templateUrl: 'views/reservation.html',
			controller: 'ReservationController'
		});

	$locationProvider.html5Mode(true);

}]);