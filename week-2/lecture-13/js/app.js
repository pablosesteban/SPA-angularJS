(function() {
    angular.module("MyApp", [])

    /*
    STEP 3: Inject the Filter into the Controller Function
         Into whatever construct we're planning to use it (controllers,...)

         Do it in the usual way we've done before which is add one more value into the array on the $inject property of the controller function and specify that as an argument in the same position when we define the controller function

         Notice that:
            the name we use is the originally registered name plus the word "FILTER"

            Unlike the filter service that we've seen before, calling lovesFilter actually calls the filter function (calling the $filter service doesn't actually call the filter function but simply creates the filter function for us)

        Angular calls our registered filter factory for us and allows us to inject the product of that factory of whatever that factory returns, which is our actual filter function. In the process, Angular names the actual filter function we inject using the name we registered a factory function plus the word "FILTER" appended at the end
    */
    .controller("expCtrl", ['$scope', '$filter', 'lovesFilter', function($scope, $filter, lovesFilter) {
        $scope.name = "Pablo";

        $scope.state = "hungry";

        $scope.msg = "Cookie cost: ";

        $scope.cookieCost = .45;

        $scope.likesMsg = "Yaakov likes to eat healthy snacks at night!";

        $scope.sayMsgUppercase = function() {
            /*
            When you call the filter service, specifying filter function you want to instantiate, i.e. uppercase, the filter service calls the uppercase filter factory, which is already supplied by Angular, to create the uppercasing filter function

            Having gotten the filter function, you can execute it with a supplied value
            */
            return $filter("uppercase")($scope.msg);
        }

        $scope.feed = function() {
            $scope.state = "fed";
        }

        $scope.sayLovesMsg = function() {
            /*
            Use the filter function "directly" as Angular called the Filter Factory Function, i.e. lovesFilterFactory(), when we inject it!

            Use or not the custom arguments
            */
            return lovesFilter($scope.likesMsg);
        }
    }])

    /*
    STEP 2: Register the Filter Factory Function with the Module
        Similar to register controllers in a module

        Call .filter() function on a module specifying the name for our filter and referencing the FilterFactory functions that's responsible to create our filter functions

        What we are really registering is a factory that creates our filter function

        A safe bet for naming the filter is to use anything that would be a valid variable name in JavaScript. The name of the function itself can be anything you want
    */
    .filter("loves", lovesFilterFactory);

    /*
    STEP 1: Define the Filter Factory Function
        Using the Factory Design Pattern: a central place in your code which produces new objects or functions

        In this case, this factory produces our filtering function (which is expected by AngularJS)

        At a minimum, the filter function itself takes some input as an argument and then usually returns some manipulated version of that input (filtered input)

        You can put some additional (custom) arguments, beside the very first one which is the input
    */
    function lovesFilterFactory() {
        return function(text, arg1) {
            //if input is true returns the first argument, otherwise return the second argument
            text = text || "";

            return arg1 ? text.replace("likes", "loves") + arg1 : text.replace("likes", "loves");
        }
    }
})();
