(function() {
    angular.module("myApp", [])
    .controller("Ctrl", ["$scope", function($scope) {
        $scope.name = "Pablo";

        $scope.lastName = "Santamarta Esteban";

        $scope.fullName;

        $scope.setFullName = function() {
            $scope.fullName = $scope.lastName + ", " + $scope.name;
        }

        $scope.logFullName = function() {
            console.log($scope.fullName);
        }

        $scope.$watch(function() {
            console.log("Digest Loop Fired!");
        });

        $scope.showNumberOfWatchers = function() {
            console.log("# of Watchers: " + $scope.$$watchersCount);
        }
    }]);
})();
