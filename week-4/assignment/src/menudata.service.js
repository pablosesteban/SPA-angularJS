(function() {
    angular.module("data")

    .service("MenuDataService", MenuDataService);

    MenuDataService.$inject = ["$http"];
    function MenuDataService($http) {
        var categoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
        var itemsUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";

        this.getAllCategories = function() {
            return $http.get(categoriesUrl);
        }

        this.getItemsForCategory = function(categoryShortName) {
            return $http.get(itemsUrl + categoryShortName);
        }
    }
})();
