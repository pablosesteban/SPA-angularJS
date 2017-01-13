(function () {
    'use strict';

    angular.module('ShoppingList')
    .controller('MainShoppingListController', MainShoppingListController);

    /*
    STEP 2: Inject the resolve property in the controller
        Just like we'll inject anything else that needs to be injected into our controller and protecting it from minification
    */
    MainShoppingListController.$inject = ['items',  "$stateParams"];
    function MainShoppingListController(items, $stateParams) {
        var mainList = this;

        //The state is in charge of getting it, just using the items we injected
        mainList.items = items;

        this.itemId = $stateParams.itemId;
    }
})();
