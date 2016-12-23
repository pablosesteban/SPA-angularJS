(function() {
    angular.module("DIApp", [])
    /*
    Dependency Injection (DI)
        Design pattern that implementes Inversion of Control for resolving dependencies

        Client gets called with the dependencies by some other system (in this case AngularJS)

        Client is not responsible for instantiating the dependencies (objects), the system does it and inject them to it

        Promote low coupling

    Inversion of Control (IoC)
         Design principle in which custom-written portions of a computer program receive the flow of control from a generic framework

         Promote modularity of the program and make it extensible

    Anything in Angular with a dollar sign ($) in front of it, not only does it belong to Angular, but it's also referred to as a service

    $scope, $filter, $injector... are all services in AngularJS that are injected to the controller

    $filter service
        Lets us create filtering functions that are used for formatting the data that eventually gets displayed to the user

    */
    .controller("DICtrl", DICtrl);

    function DICtrl($scope, $filter, $injector) {
        /*
        Defining a properties on the scope service
        */
        $scope.name = "Pablo";

        $scope.upper = function() {
            /*
            Call the filter, and we'll just call it uppercase, that's the type of filter we want to get
            */
            var upCase = $filter("uppercase");

            $scope.name = upCase($scope.name);
        };

        /*
        Gave us an array of the argument names to the function DIController

        This is exactly what Angular is using internally in order to figure out where to inject which services
        */
        console.log($injector.annotate(DICtrl));
    }
})();
