(function() {
    angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)

    .controller("AlreadyBoughtController", AlreadyBoughtController)

    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ["ShoppingListCheckOffService"];
    function ToBuyController(ShoppingListCheckOffService) {
        this.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

        this.buyItem = function(index) {
            ShoppingListCheckOffService.buyItem(index);
        }
    }

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.itemsBought = ShoppingListCheckOffService.getItemsBought();
    }

    function ShoppingListCheckOffService() {
        var itemsToBuy = [
            {
                name: "cookies",
                quantity: 10
            },
            {
                name: "apples",
                quantity: 4
            },
            {
                name: "beers",
                quantity: 24
            },
            {
                name: "pizzas",
                quantity: 2
            },
            {
                name: "eggs",
                quantity: 12
            }
        ];

        var itemsBought = [];

        this.getItemsToBuy = function() {
            return itemsToBuy;
        }

        this.getItemsBought = function() {
            return itemsBought;
        }

        this.buyItem = function(index) {
            itemsBought.push(itemsToBuy.splice(index, 1)[0]);
        }
    }
})();
