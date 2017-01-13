(function() {
    angular.module("RestaurantMenuApp")

    .service("RestaurantMenuService", RestaurantMenuService);

    RestaurantMenuService.$inject = ["$http"];
    function RestaurantMenuService($http) {
        var url = "https://davids-restaurant.herokuapp.com/categories.json";

        this.getAllCategories = function() {
            return $http.get(url);
        }

        this.getItemsForCategory = function(categoryShortName) {

        }
    }
})();
