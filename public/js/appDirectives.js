var datePicker = angular.module('appDirectives', []);

datePicker.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            $(element).datepicker({
                dateFormat: 'dd.mm.yy',
                onSelect: function (date) {
                    scope.dateSearch.date = date;
                    scope.date = date;
                    scope.$apply();
                },
                showOtherMonths: true,
                selectOtherMonths: true
            });
        }
    };

});