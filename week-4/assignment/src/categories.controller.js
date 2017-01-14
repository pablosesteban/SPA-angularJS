(function() {
    angular.module("MenuApp")

    .controller("CategoriesCtrl", CategoriesCtrl);

    CategoriesCtrl.$inject = ["menuCategories"];
    function CategoriesCtrl(menuCategories) {
        this.menuCategories = menuCategories;
    }
})();
