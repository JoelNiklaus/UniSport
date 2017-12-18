angular.module('MainCtrl', []).controller('MainController', function ($scope) {

    $scope.tagline = 'To the moon and back!';
    $scope.myInterval = 5000;

    var slides = $scope.slides = [
        {
            image: ' ./image/unisport.jpg'
        },
        {
            image: ' ./image/image22.jpg'
        },
        {
            image: ' ./image/image1.png'
        }];

    $scope.isCollapsed = true;
    $scope.dogs = [
        {
            name: "Sparky",
            breed: "Parson Russell Terrier"
        }, {
            name: "Shep",
            breed: "German Shepard"
        }
    ];
});