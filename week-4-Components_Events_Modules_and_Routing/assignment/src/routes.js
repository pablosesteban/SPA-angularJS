(function() {
    angular.module("MenuApp")

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
            templateUrl: "src/templates/categories.template.html",
            controller: "CategoriesCtrl as categories",
            resolve: {
                menuCategories: ["MenuDataService", function(MenuDataService) {
                    return MenuDataService.getAllCategories().then(function(response) {
                        return response.data;
                    });
                }]
            }
        })
        .state("categories.items", {
            url: "/{categoryShortName}",
            templateUrl: "src/templates/items.template.html",
            controller: "ItemsCtrl as items",
            resolve: {
                menuItems: ["MenuDataService", "$stateParams", function(MenuDataService, $stateParams) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName).then(function(response) {
                        return response.data.menu_items;
                    });
                }]
            }
        });
    }
})();
