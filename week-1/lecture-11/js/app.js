(function() {
    angular.module("MyApp", [])

    .controller("expCtrl", ['$scope', function($scope) {
        $scope.name = "Pablo";

        $scope.msg = function() {
            return "Hello World!";
        }

        $scope.state = "hungry";

        $scope.feed = function() {
            $scope.state = "fed";
        }
    }]);
})();
