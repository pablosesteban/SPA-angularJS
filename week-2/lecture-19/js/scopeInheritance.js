(function() {
    angular.module("myApp", [])
    /*
    INJECT the $scope NECESSARY!!!
    */
    .controller("Ctrl1", ["$scope", Ctrl1])
    .controller("Ctrl2", ["$scope", Ctrl2])
    .controller("Ctrl3", Ctrl3)
    .controller("Ctrl4", Ctrl4);

    function Ctrl1($scope) {
        $scope.name = "Pablo";
        $scope.lastName = "Santamarta Esteban";

        console.log("PARENT $scope: ", $scope);
    }

    function Ctrl2($scope) {
        $scope.name = "Maria";

        console.log("CHILD $scope: ", $scope);
    }

    /*
    CONTROLLER AS SYNTAXT:
        When it comes to implementing the control function, or the function that is responsible to implement the functionality of our controller, we can attach our properties directly to the "this" keyword inside of our controller function and NOT even have to INJECT the $scope into the controller

        We're attaching the properties directly to the instance of the controller itself and it's AngularJS that it's taking the instances in this controller and assigning it to the $scope for us behind the scene

        The "this" keyword becomes synonymous with the name of the label given in the controller as syntax in our HTML template
    */
    function Ctrl3() {
        this.name = "Pablo";
    }

    /*
    NOT NECESSARY to INJECT $scope, but to log it it is necessary
    */
    Ctrl4.$inject = ["$scope"];
    function Ctrl4($scope) {
        this.name = "Maria";

        console.log("CHILD $scope: ", $scope);
    }
})();
