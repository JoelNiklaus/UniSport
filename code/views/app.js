angular.module("SAMPLETUTO", [])
.controller("SAMPLECTRL",  function($scope,$http) {
	
	

	

	$scope.insertIS = false;
	$scope.deleteIS = false;
	$scope.showIS = false;


 


	 
	
 
	$scope.add = function(formData) {
		var data = { 'course_name': formData };
		    	  $scope.deleteIS = false;
    				$scope.showIS = false;

        $scope.insertIS = true;
        console.log(formData);

        $http.post('/insert',formData).
        then(function(response) {
        	console.log(response.data[0].name);
            $scope.insertdata=response.data[0].name;
            console.log("posted successfully");
                        $scope.formData="";
        }).catch(function(response) {
            console.error("error in posting");
        });
    }

    $scope.delete = function(formData) {
    	        console.log(formData);

    	$scope.insertIS = false;
    				$scope.showIS = false;

    	  $scope.deleteIS = true;

		var data = { 'name': formData };

        $http.post('/delete',formData).
        then(function(response) {
        	
            $scope.deletedata= response.data.n+"  task deleted ";
            console.log(response);
                        $scope.formData="";

        }).catch(function(response) {
            console.error("error in posting");
                        $scope.deletedata="errooor";

        });
    }

	$scope.show = function() {
			$scope.showIS = true;
			$scope.insertIS = false;
	$scope.deleteIS = false;


        $http.get('/show').
        then(function(response) {
        	console.log(response.data);
        	$scope.tasks=response.data;
            console.log("get successfully");
                        $scope.formData="";

        }).catch(function(response) {
            console.error("error in posting");
        });
    }



   



	

	 
		
    

               


	


	
});