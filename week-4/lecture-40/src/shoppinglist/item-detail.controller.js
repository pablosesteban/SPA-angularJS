(function() {
    angular.module("ShoppingList")

    .controller("ItemDetailController", ItemDetailController);

    /*
    STEP 3: Inject the parent inherit properties into the child state controller
        We can inject the "resolve" property (items) directly into the child controller function

        As well, $stateParams has to be injected as it is used to get the index as a url parameter

        In a lot of scenarios, this type of set up allows us to avoid extra service site calls, as we can reuse the data already pre-fetched when the parents state gets activated, so the load of the child template is faster as data is all loaded right here in the parent state!!
    */
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
