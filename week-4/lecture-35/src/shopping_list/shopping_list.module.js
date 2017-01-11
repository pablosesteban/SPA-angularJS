(function () {
    'use strict';
    //Creating the module (WITH the array of dependencies)
    angular.module('ShoppingList', ['Spinner']);

    //Retrieving the module (WITHOUT the array of dependencies)
    angular.module('ShoppingList')

    .config(function () {
        console.log("ShoppingList config fired");
    })

    .run(function () {
        console.log("ShoppingList run fired");
    });
})();
