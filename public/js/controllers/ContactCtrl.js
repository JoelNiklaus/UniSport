angular.module('ContactCtrl', []).controller('ContactController', function($scope, $http) {

	$scope.tagline = 'For further questions, you can contact us through this page.';

	$scope.sendContactForm = function(req, res) {
        $http.post('/send', $scope.contactForm).then(function(response){
            console.log("posted successfully");
        }).catch(function(response){
            console.error("error in posting");
        });

    };

});