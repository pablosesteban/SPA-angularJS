(function () {
    'use strict';

    angular.module('ShoppingList')
    .controller('MainShoppingListController', MainShoppingListController);

    MainShoppingListController.$inject = ['ShoppingListService'];
    function MainShoppingListController(ShoppingListService) {
        var mainList = this;

        mainList.items = [];

        //Called when the controller is constructed
        mainList.$onInit = function () {
            console.log("Initialized: ", this);

            ShoppingListService.getItems()

            //Returns a promise!
            .then(function (result) {
                mainList.items = result;
            });
        };
    }
})();
