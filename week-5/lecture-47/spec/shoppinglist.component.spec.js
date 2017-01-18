/*
TESTING COMPONENTS
    Now that component based architecture is becoming very popular, we need to get used to testing Angular components

    "ngMock" module provides a helper service called "$componentController" that allows us to create our component controllers in such a way that they're easy to unit test


*/
describe("shoppinglist component", function() {
    var $componentController;

    beforeEach(function() {
        /*
        STEP 1: Load the module which contains the component
        */
        angular.mock.module("ShoppingListComponentApp");

        /*
        STEP 2: Inject the _$componentController_ service
            And assign it to the global variable with the same name to use it in all of the test
        */
        angular.mock.inject(function(_$componentController_) {
            $componentController = _$componentController_;
        });
    });

    /*
    STEP 3: Write the specs
        First we'll set up our bindings if our component controller is expecting any, only set up the bindings the test is going to use (not necessary all bindings properties the component declares in the config object's bindings)

        Next we'll create the controller responsible for our component using the mock $componentController service
             First argument is the name of our component as we declared it in our application module

             Second argument are the injections our component is expecting

             Third argument is the bindings object, which is the mock bindings object we just created specifically for this test

        Last step is create the Expectation
    */
    it("should detect no cookies in list", function() {
        //The component controller is expecting an object referenced by a bound property called imtes
        var bindings = {
            items: [
                {
                    name: "item 1",
                    quantity: 1
                }
            ]
        };

        //Even though the injections are not going to be used in the spec, they have to be injected at least with "null" value or an error occurs
        var ctrl = $componentController("shoppingList", {$element: null}, bindings);

        expect(ctrl.cookiesInList()).toEqual(false);
    });

    it("should detect cookies in list", function() {
        var bindings = {
            items: [
                {
                    name: "cookies",
                    quantity: 1
                }
            ]
        };

        var ctrl = $componentController("shoppingList", {$element: null}, bindings);

        expect(ctrl.cookiesInList()).toEqual(true);
    });
});
