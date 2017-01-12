/*
Modules allow us to split up our application into smaller parts that can then be glued together

It allows us to work on different parts of our application independently and drives our thinking towards approaching our software projects as smaller parts of the bigger whole

Using modules, we can also wrap up our controllers, components directives or whatever, and offer it up to the world for others to use in their applications

Unlike regular applications that have a main method from which everything starts, in Angular, there is no main method, instead, we use the module API to declare artifacts of our application, components, controllers, and so on

It's easier to deal with individual modules with their related components, in real world development, it's also much easier NOT to place all of your JavaScript code into one file
*/
(function () {
    'use strict';

    /*
    STEP 1: Create/Declare a Module
        Calling the method "module()" on the angular object

        The string name you give to the module should be unique across your entire application

        If you specify a second argument (even though it is empty) in the module method, you're actually CREATING the module, instead of simply retrieving an existing one
    */
    //Creating the module (WITH the array of dependencies)
    angular.module('ShoppingList', ['Spinner']);

    //Retrieving the module (WITHOUT the array of dependencies)
    angular.module('ShoppingList')

    /*
    Config method runs BEFORE any other methods on the module

    The function value passed into the config method can be injected with a PROVIDER or a CONSTANT

    Since providers are used to configure services, the restrictions of not being able to inject services into the config method makes sense since we don't want to instantiate a service before we had a chance to configure how it would be instantiated

    In the case of a module that depends on other modules, all the config methods of dependencies will execute first
    */
    .config(function () {
        console.log("ShoppingList config fired");
    })

    /*
    Run method is executed right after the config method

    You can only inject INSTANCES and CONSTANTS into the run method, but not providers because we want to prevent the system from being reconfigured during run time

    In the case of a module that depends on other modules, all the run methods of dependencies will execute first
    */
    .run(function () {
        console.log("ShoppingList run fired");
    });
})();
