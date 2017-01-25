(function() {
    'use strict';

    angular.module("nameCalculator", [])

    .controller("NameCalculatorCtrl", function($scope) {
        $scope.name = "";

        $scope.nameValue = 0;

        $scope.displayNumeric = function() {
            $scope.nameValue = calculateNameValue($scope.name);
        }
    });

    function calculateNameValue(nameString) {
        var total = 0;

        for (var i = 0; i < nameString.length; i++) {
            total += nameString.charCodeAt(i);
        }

        return total;
    }
})();
