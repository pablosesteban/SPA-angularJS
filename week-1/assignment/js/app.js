(function() {
    'use strict';

    angular.module("LunchCheck", [])

    .controller("LunchCheckCtrl", check);

    check.$inject = ["$scope"];

    function check($scope) {
        $scope.msg = "";

        $scope.check = function() {
            if ($scope.items && $scope.items.split(",").length > 0) {
                angular.forEach($scope.items.split(","), function(value, key) {
                    console.log(key + ": " + value);
                });

                if ($scope.items.split(",").length <= 3) {
                    $scope.msg = "Enjoy!";
                }else {
                    $scope.msg = "Too much!";
                }
            }else {
                $scope.msg = "Please enter data first";
            }
        }
    }
})();
