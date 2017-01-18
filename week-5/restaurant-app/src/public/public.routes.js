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
  }
})();
