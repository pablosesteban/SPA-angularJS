(function() {
    angular.module("DIApp", [])
    /*
    Strings literals are protected from minification (will never get minified) because theey are "real data"

    Protecting Dependency Injection (DI) from Minification
        1) Inline array: second argument right now is a function value, but it can be an array, and it's an array of strings with the last element in the array, be the function that is responsible to be the controller function. In this case, we can actually specify what this controller function is supposed to expect in this order and, the minifier doesn't really know that this is kind of our code data and not the real data, and therefore, it will leave those alone

        2) Attach $inject property to the function object that is being injected into: Angular will look for that $inject property and use the value with it (it should be that same array we spoke about minus the last element as the function) as a guide to know where to inject which service
    */

    //1)
    .controller("diCtrl", ['$scope', '$filter', '$injector', diCtrl])

    .controller("di2Ctrl", di2Ctrl);

    function diCtrl($scope, $filter, $injector) {
        $scope.name = "Pablo";

        $scope.upper = function() {
            var upCase = $filter("uppercase");

            $scope.name = upCase($scope.name);
        };

        console.log($injector.annotate(diCtrl));
    }

    //2)
    di2Ctrl.$inject = ['$scope', '$filter', '$injector'];
    function di2Ctrl($scope, $filter, $injector) {
        $scope.name = "Pablo";

        $scope.upper = function() {
            var upCase = $filter("uppercase");

            $scope.name = upCase($scope.name);
        };

        console.log($injector.annotate(di2Ctrl));
    }
})();
