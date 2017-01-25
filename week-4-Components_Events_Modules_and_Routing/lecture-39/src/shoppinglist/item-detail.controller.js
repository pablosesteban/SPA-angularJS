(function() {
    angular.module("ShoppingList")

    .controller("ItemDetailController", ItemDetailController);

    /*
    STEP 2: Inject resolver property into the controller
    */
    ItemDetailController.$inject = ["item"];
    function ItemDetailController(item) {
        //mapping the item properties to the controller to use them in the view
        this.name = item.name;

        this.quantity = item.quantity;

        this.description = item.description;

        this.id = item.id;
    }
})();
