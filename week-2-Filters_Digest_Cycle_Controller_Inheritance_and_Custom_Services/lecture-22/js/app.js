(function () {
    'use strict';

    angular.module('ShoppingListApp', [])
    .controller("ShoppingListCtrl", ShoppingListCtrl)

    /*
    STEP 2: Register the provider
        provider() method:
            Is the most flexible method of creating services in Angular

            It lets you configure this factory before your application starts (at bootstrapping)

            In fact, is what actually gets executed behind the scenes when we configure our services with either service() or factory() methods

            First argument: the name of the service that the provider will produce and is what is used to inject into other services, controllers...

            Second argument: the service provider function that has the $get property
    */
    .provider("ShoppingListService", ShoppingListServiceProvider)

    /*
    STEP 4-A (OPTIONAL): Register the config function
         Is the special function that you can invoke on the module instance that is guaranteed to run before any services, factories, or controllers are even created

         Which means that's a step for us to be able to tap into configuring these services before they're ever created
    */
    .config(Config);

    /*
    STEP 4-B (OPTIONAL): Define the config function and inject the service provider
        We're injecting ServiceProvider into the config function

        We CANNOT inject any regular services into the config function simply because it gets executed before any service's factories or controllers are even created

        Therefore, what we need to do is get at the provider function over particular service

        What we inject into the config function is name we gave to the provider ("ShoppingListService") plus the string "Provider"
    */
    Config.$inject = ["ShoppingListServiceProvider"];
    function Config(ShoppingListServiceProvider) {
        /*
        Then we can then use this ServiceProvider instance to get at its properties, like config, and the config properties, to go ahead and configure it for our particular application
        */
        ShoppingListServiceProvider.config.maxItems = 5;
    }

    function ShoppingListService(maxItems) {
        var items = [];

        this.addItem = function(itemName, itemQuantity) {
            if ((maxItems === undefined) || (maxItems !== undefined && items.length < maxItems)) {
                items.push({
                    name: itemName,
                    quantity: itemQuantity
                });
            }else {
                throw new Error("Max items (" + maxItems + ") reached");
            }
        }

        this.removeItem = function(index) {
            items.splice(index, 1);
        }

        this.getItems = function() {
            return items;
        }
    }

    /*
    STEP 1: Define a provider function
    */
    function ShoppingListServiceProvider() {
        /*
        What makes this whole setup very special is the fact that you could provide some config object inside the service provider, and that usually comes with defaults that you can later overwrite in the step where you configure the entire application
        */
        this.config = {
            maxItems: 10
        };

        /*
        It is a special function that has a particular property on the actual instance of the function ($get) which is a factory function that create your service

        This $get property that's a function, is what makes the provider a provider

        AngularJS expects the provider to have a $get property whose value is a function that Angular will treat as a factory function
        */
        this.$get = function() {
            return new ShoppingListService(this.config.maxItems);
        }
    }

    /*
    STEP 3: Inject the provider
    */
    ShoppingListCtrl.$inject = ["$scope", "ShoppingListService"];
    function ShoppingListCtrl($scope, ShoppingListService) {
        this.items = ShoppingListService.getItems();

        this.addItem = function() {
            try{
                ShoppingListService.addItem(this.itemName, this.itemQuantity);
            }catch(error) {
                this.errorMessage = error.message;
            }
        }

        this.removeItem = function(index) {
            ShoppingListService.removeItem(index);
        }
    }
})();
