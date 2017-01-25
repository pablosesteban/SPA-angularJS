(function() {
    angular.module("ShoppingList")

    .controller("ItemDetailController", ItemDetailController);

    ItemDetailController.$inject = ["items", "$stateParams"];
    function ItemDetailController(items, $stateParams) {
        //get the item inside the controller, instead of in the resolve property, as there is no need of making another call to the "server"
        var item = items[$stateParams.itemId];

        //mapping the item properties to the controller to use them in the view
        this.name = item.name;

        this.quantity = item.quantity;

        this.description = item.description;
    }
})();
