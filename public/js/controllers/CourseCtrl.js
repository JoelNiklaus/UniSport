angular.module('CourseCtrl', []).controller('CourseController', function ($scope, $http,NgTableParams) {

    // TODO refactor code: introduce common submethods

    // TODO search by day of the week. Have to calculate day of the week from date.

    // TODO search by date
    // TODO search by address
 
    $scope.tagline = 'Here you can search all the listed courses. Just start typing, and it will automatigally search for you.';
       $scope.n;
        $scope.isClicked=true;
                $scope.details="hello test";
  $scope.searchCoursesResult;
       var m;
       var map = new Map();

    function tomorrow(date) {
        var tomorrow = new Date(date);

        tomorrow.setDate(new Date().getDate() + 1);
        return tomorrow;
    }
     
    function getAllCourses() {
        // Fetch all Courses
        $http.get('/api/allCourses').then(function (res) {

            $scope.searchCoursesResult = res.data;
            console.log("total items "+ $scope.searchCoursesResult.length);
              $scope.totalItems = $scope.searchCoursesResult.length;
               $scope.usersTable = new NgTableParams({
    page: 1,
    count: 5
  }, {
    counts: [],
    total: $scope.searchCoursesResult.length,
    dataset: $scope.searchCoursesResult
  });
 $scope.usersTables = new NgTableParams({
    page: 1,
    count: 5
  }, {
   counts: [],
    total: $scope.searchCoursesResult.length,
    dataset: $scope.searchCoursesResult
  });

        }).catch(function (err) {
            console.error(err);
        });
    };

     

 




    function getCoursesToday() {

        var req = new XMLHttpRequest();
        var date =new Date();
        var e = date.getDate()+"."+date.getMonth()+"."+date.getFullYear();
        console.log(e);
        // Fetch today's Courses
        req.date = e; // today
       

        $http.post('/api/getCoursesByDateRange', req).then(function (res) {
            $scope.coursesToday = res.data;
                      $scope.todayTable = new NgTableParams({
    page: 1,
    count: 5
  }, {
    counts: [],
    total: res.data.length,
    dataset: res.data
  });

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
    var vm = this;
    vm.Birthdate = "1988-04-21T18:25:43-05:00";
    $scope.init = function () {
        getCoursesToday();

        getCoursesWeek();

        getAllCourses();
    };
////
    $scope.IsReached = function (course) {
         return (course.number_of_participants==course.max_number_of_participants);
    };
  

$scope.disabled = function(course) {
  if($scope.IsReached(course)) { return false;}
}



          

    $scope.searchCourses = function (formData) {
        $http.post('/api/searchCourses', formData).then(function (res) {
           // $scope.searchCoursesResult = res.data;
             $data =res.data ;
              $scope.usersTable = new NgTableParams({
    page: 1,
    count: 5
  }, {
    counts: [],
    total: res.data.length,
    dataset: res.data
  });

           

        }).catch(function (err) {
            console.error(err);
        });
    };
    $scope.dateSearch = {date:''};
    $scope.getCoursesByDateRange = function (dateSearch) {
        var r =$scope.dateSearch;
        console.log(r);
      //  if(!dateSearch.end_datetime)
          //  dateSearch.end_datetime = tomorrow(dateSearch.start_datetime);
        $http.post('/api/getCoursesByDateRange', r).then(function (res) {
                         $scope.usersTables = new NgTableParams({
    page: 1,
    count: 5
  }, {
    counts: [],
    total: res.data.length,
    dataset: res.data
  });

            $scope.coursesInDateRange = res.data;
                        console.log("result");

            console.log(res.data);
        }).catch(function (err) {
            console.error(err);
        });
    };
})
;