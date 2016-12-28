(function() {
    angular.module("myApp", [])
    .controller("Ctrl", ["$scope", "$timeout", function($scope, $timeout) {
        /*
        What about code that is not inside of our angular application and sometimes still need to effect the values inside of our angular app?

        Probably something like a custom library, like jQuery, that has to handle some jquery-specific functionality, and we want to kind of plug into that and affect some of the values and therefore our UI state inside of our Angular app

        In these cases, we actually need to do something special in order to let Angular know that it needs to run its Digest Cycle
        */

        $scope.counterFail = 0;
        $scope.counterManuallyDigest = 0;
        $scope.counterApply = 0;

        $scope.incrCounterFail = function() {
            /*
            The counter gets incremented but the interpolation still says 0!

            The reason that's going on is this "timeout" gets put in the Event Queue completely separately from this call of "incrCounter" really gets it taken out out of the angular context all together

            It's not being called inside the angular context, so the Digest Cycle doesn't know to have to kick off at all

            There is more than one solution
            */
            setTimeout(function() {
                $scope.counterFail++;

                console.log("Counter Fail Incremented!");
            }, 2000);
        }

        /*
        SOLUTION 1
            Kick the Digest Cycle off manually using $digest function

            The problem with this approach is if there is any kind of errors or any exceptions that happen in the code that we are executing, the exceptions thrown as part of this code will not be visible to AngularJS

            To solve it, go through SOLUTION 2
        */
        $scope.incrCounterManuallyDigest = function() {
            setTimeout(function() {
                $scope.counterManuallyDigest++;

                /*
                The Digest Cycle is going to know to get kicked off and the watcher for this counter will therefore be checked and our DOM will get updated and repainted
                */
                $scope.$digest();

                console.log("Counter Manually Digest Incremented!");
            }, 2000);
        }

        /*
        SOLUTION 2
            Use $apply function
        */
        $scope.incrCounterApply = function() {
            setTimeout(function() {
                /*
                $apply has another function as an argument that will have the code that we actually want to execute

                But since it's all going to get wrapped inside the apply function, not only will we catch any exceptions in AngularJS but also at the end of that process $digest will get called automatically by Angular, and therefore the will get updated
                */
                $scope.$apply(function() {
                    $scope.counterApply++;

                    console.log("Counter Apply Incremented!");
                })
            }, 2000);
        }

        /*
        SOLUTION 3
            You should always try to see if there's an AngularJS alternative that's available that is native to AngularJS

            There's a service called $timeout that does exactly the same thing as set timeout does except that does it inside the angular context already, so what do you need to do on any of these tricks

            First you have to inject it to the controller!
        */
        $scope.incrCounterManuallyDigest = function() {
            setTimeout(function() {
                /*
                First argument: function with the code to execute

                Second argument: miliseconds
                */
                $timeout(function() {
                    $scope.counterManuallyDigest++;

                    console.log("Counter Manually Digest Incremented!");
                })
            }, 2000);
        }
    }]);
})();
