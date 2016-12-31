(function () {
    'use strict';

    angular.module('myApp', [])
    /*
    FACTORY DESIGN PATTERN:
        It's a central place that produces new objects (functions in JS) without exposing the creation logic to the client and refer to newly created object using a common interface
    */
    .controller("ShoppingListCtrl1", ShoppingListCtrl1)
    .controller("ShoppingListCtrl2", ShoppingListCtrl2)
    /*
    In AngularJS the Factory Design Pattern can also be used to produce dynamically customizable Services:
        factory() method:
            Sometimes called a service factory

            Is not just another way of creating the same service you create with the service() method, but it can be

            First argument: the name that we use to inject the factory into other services, controllers, etc

            Second argument: the factory function that's expected to produce a service when you execute it

        service() method:
            Also called a factory, but a much more limited one compared to the factory() method

            Is a factory that always produces the same type of service, a SINGLETON, and WITHOUT an easy way to CONFIGURE its behavior
    */
    .factory("ShoppingListServiceFactory", ShoppingListServiceFactory);


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
    2 ways of implementing the factory:
        1) Returning a function as a result of the execution of our factory function which instantiates the service and returns it

        2) Returning an object literal with some methods which instantiates the service and returns it

    No matter what way used, we are the ones responsible for instantiating the service, i.e. we're in control of how it gets created
    */
    function ShoppingListServiceFactory() {
        return function(maxItems) {
            return new ShoppingListService(maxItems);
        };

        /*
        return {
            getShoppingListService: function(maxItems) {
                return new ShoppingListService(maxItems);
            },

            getSomeOtherService: function(){}
        };
        */
    }

    /*
    Each controller use a different instance of the ShoppingListService service!!
    */
    ShoppingListCtrl1.$inject = ["ShoppingListServiceFactory"];
    function ShoppingListCtrl1(ShoppingListServiceFactory) {
        /*
        Creating the service using the factory without limit of items!
        */
        var shoppingListService = ShoppingListServiceFactory();

        this.items = shoppingListService.getItems();

        this.addItem = function() {
            shoppingListService.addItem(this.itemName, this.itemQuantity);
        }

        this.removeItem = function(index) {
            shoppingListService.removeItem(index);
        }
    }

    ShoppingListCtrl2.$inject = ["ShoppingListServiceFactory"];
    function ShoppingListCtrl2(ShoppingListServiceFactory) {
        /*
        Creating the service using the factory with limit of items to 3!
        */
        var shoppingListService = ShoppingListServiceFactory(3);

        this.items = shoppingListService.getItems();

        this.addItem = function() {
            try{
                shoppingListService.addItem(this.itemName, this.itemQuantity);
            }catch(error) {
                this.errorMessage = error.message;
            }
        }

        this.removeItem = function(index) {
            shoppingListService.removeItem(index);
        }
    }
})();
