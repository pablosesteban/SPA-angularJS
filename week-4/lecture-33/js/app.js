/*
Angular 1.5 introduced a new way of implementing directives, COMPONENTS

They are a special kind of directives that uses a simplified configuration that assumes some defaults

Angular 2 uses a style of programming based on components

Principles of component based architecture:
    Components only control their own view and data, they never modify data or DOM outside of their own scope
        Angular components always use ISOLATE SCOPE: because of prototypal inheritance, it's possible for your code to modify data pretty much anywhere in your application so no piece of your code in your application can be assured that it's data is safe from side effects it knows nothing about and it doesn't even control

    Components have well-defined public API
        APIs are contracts: data inputs into the component, be guaranteed that my data is safe from being modified and data outputs from the component

        To achieve this, component code should follow some simple conventions:
            Are designed to further discourage manipulation of data that doesn't directly belong to the component, which can happen even with isolate scope

            The inputs, into the component should be defined only with one way binding (<) and dump attribute value binding

            Never change the property value of a passed in object or an array, as even with one directional binding, if the bound value is an object, changing that object's property values will impact that object outside of the component

            The output of the component is defined with a ampersand (&) as callbacks to the component events, the data is passed back to the caller through the key value map object that maps the caller's argument name with a key in the map, just like directives

    Components have well-defined lifecycle
        Meaning that they have a number of pre-defined methods that we can tap into at different times of the life cycle of the component
            $onInit: to initialize things for your controller's functionality

            $onChanges(changeObj): gets a change object passed into it, and that method is called whenever one-way bindings are updated

            $postLink: similar to "link" we had in the directive

            $onDestroy: called when scope is about to be destroyed, meaning when it's getting unloaded from memory. To release external resources, watches, and event handlers that were set up in the other methods

    An application should be viewed as a tree of components
        The entire application should be comprised of components

        Each one would have a well-defined input and output

        The two-way data binding should be minimized, it's easier to predict when and where the data changes (be confident what the state of your component is)
*/
(function() {
    angular.module("ShoppingListComponentApp", [])

    .controller("ShoppingListController", ShoppingListController)

    .factory("ShoppingListFactory", ShoppingListFactory)

    /*
    STEP 1: Register the component with the module
        The first argument is the name of your component and that's the normalized form (in HTML will be seen as shopping-list)

        The second argument instead of providing a function or factory function as the implementation of your component, you provide the typical configuration object
    */
    .component("shoppingList", {
        /*
        STEP 2: configure the actual component
            Most components have a template that is associated with them

            You're not required to provide a controller for the component. Only specify one here if you actually have some functionality to it. Otherwise, angular will provide an empty object automatically, and will also automatically place the instance of this component onto the isolate scope with the label of "$ctrl"

            Bindings object is the isolate scope parameter mapping definition, is exactly the same thing used in custom directives called "scope" but here the scope is always isolate with no ability for us to change it
        */
        templateUrl: 'templates/shoppingList.html',
        controller: ShoppingListComponentController,
        bindings: {
            items: '<',
            myTitle: '@title',
            onRemove: "&"
        }
    });

    //Controller Functions
    ShoppingListComponentController.$inject = ["$scope", "$element"];
    function ShoppingListComponentController($scope, $element) {
        //local variable, can be any allowed name but naming the same as in the component template
        var $ctrl = this;

        $ctrl.cookiesInList = function () {
            for (var i = 0; i < $ctrl.items.length; i++) {
                var name = $ctrl.items[i].name;

                if (name.toLowerCase().indexOf("cookie") !== -1) {
                    return true;
                }
            }

            return false;
        };

        $ctrl.remove = function(itemIndex) {
            $ctrl.onRemove({index: itemIndex});
        }

        /*
        Life cycle methods
        */
        //This is only going to get executed once when the controller gets instantiated
        $ctrl.$onInit = function() {
            console.log("$onInit() executed!");
        }

        /*
        changeObject is going to get pass into us by the angular framework

        It has myTitle and items properties, which are the things that actually first arrived when the whole thing got initialized

        When adding something to the list $onChanges fires again, but you'll see that myTitle is the ONLY thing that changed and the changeObject has proeprties to current and previous value

        Why didn't items property get changed?
            Because the only thing that is being watched is the reference to that items array and the reference, no matter what items we add into the array, stays the same

            If we were to change the reference of the array NOT inside of our component BUT outside of our component that out changes would fire it wouldn't include my items (one-way binding)
        */
        $ctrl.$onChanges = function(changeObject) {
            console.log("$onChanges() changeObject: ", changeObject);
        }

        //Basically the same thing as the "link" property that we used before in custom directives, so let's use it in the same way as we used it before
        $ctrl.$postLink = function() {
            //To setup a watch on the cookiesInList function we need to scope variable because we need the $scope.$watch function so we have to inject it in the controller
            $scope.$watch("$ctrl.cookiesInList()", function(newVal, oldVal) {
                /*
                The problem is that this function doesn't actually have the scope, element... objects injected by angular like in custom directives

                In order to get at the actual element that is our component (the parent item or the top item of our component) there is another service called $element that we have to inject
                */
                console.log("$element service object: ", $element);

                if (newVal === true) {
                    /*
                    If jQuery is available for us the $element actually represents an element as a jQuery object (else a jqLite)

                    It's going to again look only in the template of our component, not through the entire HTML of our page which is really good because it's going to be much, much faster
                    */
                    var elementDiv = $element.find("div.error");

                    console.log("$element object: ", elementDiv)

                    elementDiv.fadeIn("slow");
                }else {
                    var elementDiv = $element.find("div.error");

                    console.log("$element object: ", elementDiv)

                    elementDiv.fadeOut("slow");
                }
            });
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
