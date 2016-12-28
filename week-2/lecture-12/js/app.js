(function() {
    angular.module("MyApp", [])

    /*
    $filter Service:
         Format the value of an expression for display to the user

         Angular comes with a collection of built-in filters (uppercase, currency, json...), but it is easy to define your own as well

         Some kind of filters have custom arguments that are specific to each particular filter (currency filter)

         You could use them either in HTML (inside expressions using the pipe character |) or in JavaScript (inyecting the $filter service)
    */
    .controller("expCtrl", ['$scope', '$filter', function($scope, $filter) {
        $scope.name = "Pablo";

        $scope.state = "hungry";

        $scope.msg = "Cookie cost: ";

        $scope.cookieCost = .45;

        $scope.sayMsgUppercase = function() {
            /*
            Javascript Filter:
                $filter("uppercase"): creates a filtering function based on the parameter

                ($scope.msg): executes the filtering function using the parameter
            */
            return $filter("uppercase")($scope.msg);
        }

        $scope.feed = function() {
            $scope.state = "fed";
        }
    }]);
})();
