(function () {
    'use strict';

    angular.module('ShoppingList')
    .controller('MainShoppingListController', MainShoppingListController);

    MainShoppingListController.$inject = ['items'];
    function MainShoppingListController(items) {
        var mainList = this;

        //The state is in charge of getting it, just using the items we injected
        mainList.items = items;
    }
})();
