angular.module('ContactCtrl', []).controller('ContactController', function($scope, $http) {

	$scope.tagline = 'For further questions, you can contact us through this page.';
	//$scope.danger = null;
	//$scope.success = null;

	$scope.sendContactForm = function(contactForm) {

	    if (contactForm.$valid) {
	        var newFormData = angular.copy(contactForm);

            $http.post('/send', newFormData).then(function(response) {

                 $scope.danger = null;
                 $scope.success = "Your message was sent successfully.";


            }).catch(function(err){
                console.log(err.data);
                $scope.danger = "An error occurred. Could not send message: " + err.message;
                console.error(err.message);
            });
        }

        else {
	        $scope.danger = "Something went wrong. Some part of your message was found to be invalid. \n Please try again."
        }

    };

});