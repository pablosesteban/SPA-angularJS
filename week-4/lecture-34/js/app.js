/*
AngularJS Event System:
    To deal with comunication between components in an application

    In Angular this can be done through:
        Prototypal Inheritance between components, i.e. directives, controllers...

        Singleton Services

    There are situations where such communications create too many dependencies between different parts of your application

    PUBLISH SUBSCRIBE DESIGN PATTERN:
        To solve those situations

        There are two components in the design pattern:
            PUBLISHERS:
                Send messages to subscribers on some common channel

                Mark messages with some classification

                Don't know the subscribers of their messages, nor do they know if there are any subscribers out there at all

            SUBSCRIBERS:
                Sign up to listen for messages with a particular classification

                Don't know publishers or if there are any publishers for these particular messages at all

        Messages that we are speaking about are called Events that can hold data

    The common channel in which these messages communicate over is $scope

    There are two ways to publish an event:
        $scope.$emit: emit an event that goes UP the chain scope and keep going up the scope until it reached all the way to the top scope in the application

        $scope.$broadcast: events go DOWN the chain scope and would propagate all the way down the chain scope to the very last leaf in the scope chain

    One way to subscribe to an event:
        $scope.$on: catch the event and passes the data to the handler function

    What happens when the target of your broadcast is not in the direct path of your broadcast code down the chain?
        You can broadcast your event from the parent scope of everything in your app known as the ROOT SCOPE

    The "ng-app" directive that we have declared on some top element like html in our html page is actually the parent controller to ALL controllers, directives, and components that live under it

    Angular has a special service called $rootScope that you can inject into anything in your application in order to refer to the highest scope in the chain possible

    When you broadcast from the root scope, every single node in your application gets the event and has a chance to respond to it

    The code to emit and broadcast can be done from a controller, service, a component or anything really
*/
(function() {
    'use strict';

    angular.module("ShoppingListEventApp", [])

    .controller("ShoppingListController", ShoppingListController)

    .service("WeightLossFilterService", WeightLossFilterService)

    .factory("ShoppingListFactory", ShoppingListFactory)

    .component("shoppingList", {
        templateUrl: 'templates/shoppingList.html',
        controller: ShoppingListComponentController,
        bindings: {
            items: '<',
            myTitle: '@title',
            onRemove: "&"
        }
    })

    .component("loadingSpinner", {
        templateUrl: "templates/spinner.html",
        controller: LoadingSpinnerController
    });

    //Controller Functions
    LoadingSpinnerController.$inject = ["$rootScope"];
    function LoadingSpinnerController($rootScope) {
        var $ctrl = this;

        /*
        STEP 2: Register a listener for your event ($on method)
            This is executed on some $scope or $rootScope

            First argument is the same event namestring we broadcasted or emitted the event with

            Second argument is the handler function is automatically passed to arguments

            The $on function actually returns a deregistration function

            $rootScope is NEVER destroyed (also everything attached to it) until the entire application is destroyed and here we have potential for a really nice memory leak

            This spinner controller and this spinner component all together will work very well in this view. But what happens if I switch views and comeback to it and then switch and comeback to it. Every time it may comeback to it, we're going to have this executed but nothing actually de-registers it, which means every time we will register this event listener and there is really no code to go ahead and destroy this
        */
        var cancelListener = $rootScope.$on("shoppingList:processing", function(event, data) {
            console.log("Event object: ", event);
            console.log("Data object: ", data);

            if (data.on) {
                $ctrl.showSpinner = true;
            }else {
                $ctrl.showSpinner = false;
            }
        });

        /*
        Every time this view gets destroyed, and the scope, the $scope that belongs to this controller and belongs to this component gets destroyed, will also at the same time de-register our $rootScope.$on, so it will not hang around even though we're no longer using the scope

        If you were to skip doing that, you would leave the listener function registered in memory basically, for the rest of their life of this application

        And what's worse, as you keep coming back to this view, new listener functions would be registered, and more and more of them would keep sitting in memory without anyway to reach them and unload them from memory by deregistering their listening to the event
        */
        this.$onDestroy = function() {
            cancelListener();
        }
    }

    ShoppingListComponentController.$inject = ["$element", "$scope", "$rootScope", "WeightLossFilterService", "$q"];
    function ShoppingListComponentController($element, $scope, $rootScope, WeightLossFilterService, $q) {
        //local variable, can be any allowed name but naming the same as in the component template
        var $ctrl = this;

        //Total items in our shopping list, in order to use the $doCheck() method for comparison
        var totalItems;

        $ctrl.remove = function(itemIndex) {
            $ctrl.onRemove({index: itemIndex});
        }

        $ctrl.$onInit = function() {
            //Initialized once
            totalItems = 0;

            console.log("$onInit() executed!");
        }

        $ctrl.$onChanges = function(changeObject) {
            console.log("$onChanges() changeObject: ", changeObject);
        }

        //Implementing inside this method all functionality means that whenever the "items" changes this code is going to be executed as this method is called on each turn of the digest cycle
        $ctrl.$doCheck = function() {
            if (totalItems !== $ctrl.items.length) {
                /*
                STEP 1: Broadcast or Emit an Event ($emit or $broadcast)
                    First argument is the name of the event which will be catched by other component of the app. Its the best practice to name space the event name string, is useful for code readability down the line when you try to understand what part of the system the event is targeting

                    Second argument is an object containing some data which can be unwrapped when the event arrives at its destination
                */
                $rootScope.$broadcast("shoppingList:processing", {on: true});

                totalItems = $ctrl.items.length;

                var promises = [];
                for(var i = 0; i < $ctrl.items.length; i++) {
                    promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
                }

                $q.all(promises)
                .then(function(response) {
                    $element.find('div.error').slideUp(900);
                })
                .catch(function(error) {
                    $element.find('div.error').slideDown(900);
                })
                .finally(function() {
                    $rootScope.$broadcast("shoppingList:processing", {on: false});
                });
            }
        }
    }

    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory) {
        var list = this;

        var shoppingList = ShoppingListFactory();

        var origTitle = "Shopping List #1";

        list.items = shoppingList.getItems();

        list.title = origTitle + " (" + list.items.length + " items )";

        list.addItem = function () {
            shoppingList.addItem(list.itemName, list.itemQuantity);

            list.title = origTitle + " (" + list.items.length + " items )";
        };

        list.removeItem = function (itemIndex) {
            console.log("this keyword: ", this);

            this.lastRemoveItem = "Last item removed was " + this.items[itemIndex].name;

            shoppingList.removeItem(itemIndex);

            this.title = origTitle + " (" + list.items.length + " items )";
        };
    }

    //Service Functions
    WeightLossFilterService.$inject = ['$q', '$timeout']
    function WeightLossFilterService($q, $timeout) {
        var service = this;

        service.checkName = function (name) {
            var deferred = $q.defer();

            var result = {
                message: ""
            };

            $timeout(function () {
                // Check for cookies
                if (name.toLowerCase().indexOf('cookie') === -1) {
                    deferred.resolve(result)
                }else {
                    result.message = "Stay away from cookies, Yaakov!";

                    deferred.reject(result);
                }
            }, 3000);

            return deferred.promise;
        };

        service.checkQuantity = function (quantity) {
            var deferred = $q.defer();

            var result = {
                message: ""
            };

            $timeout(function () {
                // Check for too many boxes
                if (quantity < 6) {
                    deferred.resolve(result);
                }else {
                    result.message = "That's too much, Yaakov!";

                    deferred.reject(result);
                }
            }, 1000);

            return deferred.promise;
        };
    }

    function ShoppingListService(maxItems) {
        var service = this;

        var items = [];

        service.addItem = function (itemName, quantity) {
            if ((maxItems === undefined) || (maxItems !== undefined) && (items.length < maxItems)) {
                var item = {
                    name: itemName,
                    quantity: quantity
                };

                items.push(item);
            }else {
                throw new Error("Max items (" + maxItems + ") reached.");
            }
        };

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        };

        service.getItems = function () {
            return items;
        };
    }

    //Factory Functions
    function ShoppingListFactory() {
        var factory = function (maxItems) {
            return new ShoppingListService(maxItems);
        };

        return factory;
    }
})();
