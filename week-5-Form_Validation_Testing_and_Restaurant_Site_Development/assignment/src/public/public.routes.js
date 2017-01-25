(function() {
  "use strict";

  angular.module("public")
  .config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider"];
  function RoutesConfig($stateProvider) {
    $stateProvider
    .state("public", {
      // ajax call (only first time) and put it on $templateCache
      templateUrl: "src/public/public.html",
      /*
      abstract property:
        It means that you can never go directly to this state

        This state is more like a parent

        It's a parent to other states that other states can inherit from and share attributes of the state, but you can never go directly to that state

        Meaning that states like "public.home" will share this templateUrl property (public.html), they will share that and it will actually inject something in there
      */
      abstract: true
    })
    .state("public.home", {
      url: "/",
      // ajax call (only first time) and put it on $templateCache
      templateUrl: "src/public/home/home.html"
    })
    /*
    This templateUrl is now going to get inserted in the same place where we previously inserted home.html because they are part of the same parent

    This one is going to get inserted inside of the ui-view directive inside of public.html
    */
    .state("public.menu", {
      url: "/menu",
      templateUrl: "src/public/menu/menu.html",
      controller: "MenuController",
      controllerAs: "menuCtrl",
      resolve: {
        menuCategories: ["MenuService", function(MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state("public.menuitems", {
      url: "/menu/{category}",
      templateUrl: "src/public/menu-items/menu-items.html",
      controller: "MenuItemsController",
      controllerAs: "menuItemsCtrl",
      resolve: {
        menuItems: ["MenuService", "$stateParams", function(MenuService, $stateParams) {
          return MenuService.getCategoryItems($stateParams.category);
        }]
      }
    })
    .state("public.signup", {
      url: "/signup",
      templateUrl: "src/public/signup/signup.html",
      controller: "SignUpController",
      controllerAs: "signupCtrl",
      // resolve: {
      //   menuCategories: ["MenuService", function(MenuService) {
      //     return MenuService.getCategories();
      //   }]
      // }
    })
    .state("public.info", {
      url: "/info",
      templateUrl: "src/public/info/info.html",
      controller: "InfoController",
      controllerAs: "infoCtrl"
    });
  }
})();
