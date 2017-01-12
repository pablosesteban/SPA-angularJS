(function () {
    'use strict';

    /*
    STEP 2: Declare Module Artifacts
        The second argument to the module method is omitted

        This assumes that we have previously created this module

        If we haven't, the code to retrieve the module will cause an error
    */
    angular.module('ShoppingList')

    .controller("ShoppingListController", ShoppingListController);

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
})();
