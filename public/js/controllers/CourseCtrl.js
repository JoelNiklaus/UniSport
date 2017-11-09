angular.module('CourseCtrl', []).controller('CourseController', function ($scope, $http) {

    // TODO refactor code: introduce common submethods

    // TODO search by day of the week. Have to calculate day of the week from date.

    // TODO search by date
    // TODO search by address

    $scope.tagline = 'Here you can search all the listed courses. Just start typing, and it will automatigally search for you.';

    function tomorrow(date) {
        var tomorrow = new Date(date);
        tomorrow.setDate(new Date().getDate() + 1);
        return tomorrow;
    }

    function getAllCourses() {
        // Fetch all Courses
        $http.get('/api/allCourses').then(function (res) {
            $scope.searchCoursesResult = res.data;
        }).catch(function (err) {
            console.error(err);
        });
    }

    function getCoursesToday() {
        var req = new XMLHttpRequest();
        // Fetch today's Courses
        req.start_datetime = new Date(); // today
        req.end_datetime = tomorrow(new Date());

        $http.post('/api/getCoursesByDateRange', req).then(function (res) {
            $scope.coursesToday = res.data;
        }).catch(function (err) {
            console.error(err);
        });
    }

    function getCoursesWeek() {
        var req = new XMLHttpRequest();
        // Fetch today's Courses
        req.start_datetime = new Date(); // today
        var nextWeek = new Date();
        nextWeek.setDate(new Date().getDate() + 7); // next week
        req.end_datetime = nextWeek;

        $http.post('/api/getCoursesByDateRange', req).then(function (res) {
            $scope.coursesWeek = res.data;
        }).catch(function (err) {
            console.error(err);
        });
    }

    $scope.init = function () {
        getCoursesToday();

        getCoursesWeek();

        getAllCourses();
    };

    $scope.searchCourses = function (formData) {
        $http.post('/api/searchCourses', formData).then(function (res) {
            $scope.searchCoursesResult = res.data;
        }).catch(function (err) {
            console.error(err);
        });
    };

    $scope.getCoursesByDateRange = function (dateSearch) {
        if(!dateSearch.end_datetime)
            dateSearch.end_datetime = tomorrow(dateSearch.start_datetime);
        $http.post('/api/getCoursesByDateRange', dateSearch).then(function (res) {
            $scope.coursesInDateRange = res.data;
            console.log(res.data);
        }).catch(function (err) {
            console.error(err);
        });
    };
})
;