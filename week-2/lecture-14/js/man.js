(function() {
    angular.module("MyApp", [])

    .controller("Ctrl", ['$scope', function($scope) {
        $scope.onceCounter = 0;

        $scope.countOnce = function() {
            $scope.onceCounter = 1;
        }

        $scope.counter = 0;

        $scope.incrementCounter = function() {
            $scope.counter++;
        }

        /*
        The Angular Context, or the $scope, has a special array of watchers that goes through every property on which a watch has been set up, to check if any of the properties have changed as a result of the event that just happened (ng-click,...):
            $scope.$$watchers: that's an array of watcher objects

            $scope.$$watchersCount: that's a count of how many objects are there in this watchers arrays

        Angular automatically set up these watchers (set up a function to watch for these changes to those properties) for the properties we've defined on the $scope when:
            you surround a scope property with "double curly braces" in your HTML

            you specify "ng-model" equal to some scope property

        Angular kicks off that process with a special function called $digest

        Digest Cycle:
             $digest goes through all the watchers and checks that everything is unchanged

             If truly unchanged, the loop ends

             If something has changed, Angular goes through the whole list of watchers once again

             This keeps repeating until all the watchers report that no changes occurred

             This iterationis called the Digest Loop

             So most of the time this loop runs twice: once to detect that something changed and another time to make sure nothing has changed

             Once the final Digest Loop runs and verifies that nothing has changed in any of the watchers (DIRTY CHECKING), Angular updates the DOM with whatever values have changed
        */
        $scope.showScopeService = function() {
            console.log($scope);
        }

        $scope.showNumberOfWatchers = function() {
            /*
            The double $ ($$) is always indicative of something that is internal to AngularJS, which means you should never interact with this directly
            */
            console.log("# of Watchers: " + $scope.$$watchersCount);
        }

        /*
        Those variables are NOT being WATCHED by Angular, but you can watch them MANUALLY (NOT RECOMMENDED)

        $digest now will watch for changes in those two variables

        Those functions ONLY will be called whenever the scope variable CHANGES
        */
        $scope.$watch("onceCounter", function(newValue, oldValue) {
            console.log("onceCounter oldValue: " + oldValue);
            console.log("onceCounter newValue: " + newValue);
        });

        $scope.$watch("counter", function(newValue, oldValue) {
            console.log("counter oldValue: " + oldValue);
            console.log("counter newValue: " + newValue);
        });
    }]);
})();
