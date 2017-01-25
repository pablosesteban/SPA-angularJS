(function() {
    angular.module("MyApp", [])

    .controller("Ctrl", ['$scope', function($scope) {
        /*
        Angular creates a watcher for those variables as they are used in HTML inside double curly braces or ng-model tag
        */
        $scope.name = "Pablo";
        $scope.count = 0;
        $scope.countOne = 0;

        $scope.incrCount = function() {
            $scope.count++;
        }

        $scope.incrCountOne = function() {
            $scope.countOne = 1;
        }

        /*
        To see when the Digest Loop is actually getting executed

        We'll give it a function, because this function is something that is supposed to return the name of the property to watch

        Which means every time through the loop, the digest cycle will want to figure out what property is that and execute it

        So that means we could catch when the digest loop is actually going through all these watchers

        This is also a watch that we're setting up, so it is in the $scope.$$watchers array!!
        */
        $scope.$watch(function() {
            console.log("Digest Loop Fired!");
        });

        $scope.showNumberOfWatchers = function() {
            console.log("# of Watchers: " + $scope.$$watchersCount);
        }
    }]);
})();
