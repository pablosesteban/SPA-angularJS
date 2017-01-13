(function() {
    angular.module("RestaurantMenuApp")

    .controller("CategoriesCtrl", CategoriesCtrl);

    CategoriesCtrl.$inject = ["categories"];
    function CategoriesCtrl(categories) {
        this.categories = categories;
    }
})();
