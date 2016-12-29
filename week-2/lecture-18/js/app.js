(function() {
    'use strict'

    var shoppingList = ["Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"];

    angular.module("myApp", [])
    .controller("Ctrl", ["$scope", function($scope) {
        $scope.shoppingList = shoppingList;

        $scope.showNumberOfWatchers = function() {
            console.log("# of Watchers: " + $scope.$$watchersCount);
        }
    }]);
})();
