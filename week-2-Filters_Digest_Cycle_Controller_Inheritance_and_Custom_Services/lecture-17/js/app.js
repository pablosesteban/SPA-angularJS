(function() {
    'use strict'

    var shoppingList = [
        {
            name: "Milk",
            quantity: "2"
        },
        {
            name: "Donuts",
            quantity: "200"
        },
        {
            name: "Cookies",
            quantity: "300"
        },
        {
            name: "Chocolate",
            quantity: "5"
        }
    ];

    angular.module("myApp", [])
    .controller("Ctrl", ["$scope", function($scope) {
        $scope.shoppingList = shoppingList;

        /*
        It is the same adding to the MODEL directly or to the SCOPE!
        */
        $scope.addItemModel = function() {
            shoppingList.push({
                name: $scope.newItemName,
                quantity: $scope.newItemQuantity
            });
        }

        $scope.addItemScope = function() {
            $scope.shoppingList.push({
                name: $scope.newItemName,
                quantity: $scope.newItemQuantity
            });
        }

        $scope.logModelList = function() {
            console.log(shoppingList);
        }

        $scope.logScopeList = function() {
            console.log($scope.shoppingList);
        }
    }]);
})();
