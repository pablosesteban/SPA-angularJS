/*
TESTING CONTROLLERS
    In the MV-VM design pattern, the ViewModel which we implemented as a controller in Angular was not allowed to have code that directly asks the view to display something

    It is only to represent the data or state that the view is in

    This fact makes the controller much easier to test without having to include the browser's document object model, or the DOM

    AngularJS also provides a helper module to help us test Angular applications called "ngMock" and it's a separate JavaScript file
*/
describe("ShoppingListController", function() {
    /*
    STEP 1: Load the module where the controller to test belongs
        Use the "angular.mock.module()" function or its alias "module()"

        You provide the name of the module of which you want to execute the test, as the argument to the module function
    */
    //You can have more than one "beforeEach()" functions or wrap this and the next one into one
    beforeEach(angular.mock.module("ShoppingListApp"));

    /*
    Local variable in order to reuse it along the test
    */
    var $controller;
    var shoppingListCtrl;

    /*
    STEP 2: Inject some objects that we need to have available for the test
        The "inject()" method is an alias for the "angular.mock.inject()" method

        Inject the "_$controller_" service:
            It's a standard service that AngularJS uses to instantiate controllers in our applications, and we'll need to use it to instantiate our own controller manually

            You can save off the controller service instance in a variable (above variable) with any name, but it is usually to refer to the controller service by its recognizable name, which is the $controller (if it would be called $controller we cannot call our local variable the same)

            Angular came up with a solution for us, that's based on a convention, surround the service with underscores and the angular inject method will automatically strip off the underscores, in order to look for that service and then inject the right one
    */
    beforeEach(angular.mock.inject(function(_$controller_) {
        $controller = _$controller_;

        /*
        STEP 3: Setting up a mock service
            Create a mock version of our ShoppingListService used by the controller we want to test and add it the functionality it needs for testing

            Our controller will not know the difference and will blissfully call our mockService treating it as a real one

            Note that we created manually a Mock Object without any help from Angular
        */
        var ShoppingListServiceErrorMock = {};

        /*
        We're mocking out an error, so I'm just going to fake this addItem() function, the function inside the service and used by the controller, to be a function takes a name and a quantity, I really didn't need this at all, and will always throw an error and will always throw an error with a message "Test message"
        */
        ShoppingListServiceErrorMock.addItem = function (item, quantity) {
            throw new Error("Test message");
        }

        /*
        The other one that we need, which is going to get called by our controller, is getItems() function (it's just going to get called automatically at the beginning of our controller so we need that)

        We don't really care about that method, but it is needed, so, we're just going to go ahead and return null

        That's not really going to affect our test, at least it shouldn't affect our test, as the function we are going to test is the above one
        */
        ShoppingListServiceErrorMock.getItems = function() {
            return null;
        }

        /*
        STEP 4: Instantiate our controller
            Using the $controller service by passing it the string name the controller was registered with in our real application module

            We also pass any dependencies (as an object literal) that our controller would usually get injected with by passing in an object where each property is the name of whatever the controller would be injected with

            The controller is expecting a ShoppingListService, but we're giving it an instance of ShoppingListServiceErrorMock instead of a real ShoppingListService

            This way we are in control of what this mock service will provide our controller and therefore, we're able to isolate just the behavior of the controller to test
        */
        shoppingListCtrl = $controller("ShoppingListCtrl", {ShoppingListService: ShoppingListServiceErrorMock});
    }));

    //Create the tests
    it("should change error message in controller", function() {
        /*
        STEP 5: Test some function attached to the controller instance
        */
        shoppingListCtrl.addItem();

        expect(shoppingListCtrl.errorMessage).toBe("Test message");
    });
});
