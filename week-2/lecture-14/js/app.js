
    angular.module("MyApp", [])
    .controller("Ctrl", ["$scope", function($scope) {
        $scope.name = "pablo";

        $scope.$watch(function() {
            console.log($scope.$$watchersCount);

            console.log("Digest Loop Fired!");
        })
    }]);
