(function () {
    'use strict';

    angular.module('myApp', [])
    /*
    CONTROLLERS RESPONSIBILITIES:
        Set up the initial state of data on the $scope

        Add behavior to the $scope, i.e. handling any events and updating the view state, i.e. affecting the values on the $scope object as a result of some event bound to one of the methods on the $scope

    CUSTOM SERVICES:
        We do not want to use Controllers to handle business logic directly

        The code that handles the business logic should be factored out into its own component

        Also we should not use Controller to share code or state across other Controllers

        The answer to all of above is to use a Custom Service
    */
    .controller("AddToShoppingListCtrl", AddToShoppingListCtrl)
    .controller("ShowShoppingListCtrl", ShowShoppingListCtrl)
    /*
    Register a Service is the same as register a Controller

    service() method:
        The name of the service: use to inject into other Services or Controllers

        The function: treat as a Function Constructor used to create that service (the service itself)

        The service AngularJS will create for us using this method is:
            guaranteed to be a SINGLETON: that's why services are very convenient for sharing data across your application

            LAZILY INSTANTIATED: the service is only created if an application component declares it as a dependency
    */
    .service("ShoppingListService", ShoppingListService);

    /*
    CONTROLLERS that do not share $scope

    The SAME INSTANCE of the Service is injected in both

    This DO NOT create ANOTHER INSTANCE, use what is created by service() method (singleton)

    ONLY EXPOSES functionality, DO NOT handle business logic
    */
    AddToShoppingListCtrl.$inject = ["ShoppingListService"];
    function AddToShoppingListCtrl(ShoppingListService) {
        /*
        Initialize the variables to an empty string

        NECESSARY?????
        */
        this.itemName = "";
        this.itemQuantity = "";

        this.addItem = function() {
            ShoppingListService.addItem(this.itemName, this.itemQuantity);
        }
    }

    ShowShoppingListCtrl.$inject = ["ShoppingListService"];
    function ShowShoppingListCtrl(ShoppingListService) {
        this.items = ShoppingListService.getItems();

        this.removeItem = function(index) {
            ShoppingListService.removeItem(index);
        }
    }

    /*
    CUSTOM SERVICE:
        Share the data across Controllers

        Handles the business logic
    */
    function ShoppingListService() {
        var items = [];

        this.addItem = function(itemName, itemQuantity) {
            items.push({
                name: itemName,
                quantity: itemQuantity
            });
        }

        this.removeItem = function(index) {
            items.splice(index, 1);
        }

        this.getItems = function() {
            return items;
        }
    }
})();
