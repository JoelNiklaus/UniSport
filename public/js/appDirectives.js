var datePicker = angular.module('appDirectives', []);

datePicker.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            $(element).datepicker({
                //dateFormat: 'DD, d  MM, yy',
                onSelect: function (date) {
                    scope.date = date;
                    scope.$apply();
                },
                showOtherMonths: true,
                selectOtherMonths: true
            });
        }
    };
});