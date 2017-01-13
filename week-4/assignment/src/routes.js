(function() {
    angular.module("RestaurantMenuApp")

    .config(RoutesConfig);

    RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "src/templates/home.template.html"
        })
        .state("categories", {
            url: "/categories",
            templateUrl: "src/templates/categories_list.template.html",
            controller: "CategoriesCtrl as home",
            resolve: {
                categories: ["RestaurantMenuService", function(RestaurantMenuService) {
                    return RestaurantMenuService.getAllCategories().then(function(categories) {
                        return categories;
                    });
                }]
            }
        })
        .state("categories.items", {
            url: "/{categoryId}/items",
            templateUrl: "src/templates/items_list.template.html",
            controller: "ItemsCtrl as home"
        });
    }
})();
