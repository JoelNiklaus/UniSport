angular.module('ReservationService', []).factory('Reservation', ['$http', function ($http) {

    return {
        helloWorld: function () {
            console.log("Hello World");
            return "Hello World";
        },

        // call to get all courses
        get: function () {
            return $http.get('/api/courses');
        }
        ,

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new course
        create: function (courseData) {
            return $http.post('/api/courses', courseData);
        }
        ,

        // call to DELETE a course
        delete:

            function (id) {
                return $http.delete('/api/courses/' + id);
            }
    }

}]);