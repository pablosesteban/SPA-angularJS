(function() {
  "use strict";

  angular.module("restaurant", ["public"])
  .config(Config);

  Config.$inject = ["$urlRouterProvider"]
  function Config($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
  }
})();
