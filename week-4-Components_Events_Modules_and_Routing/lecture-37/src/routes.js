(function () {
    'use strict';

    //Retrieving the module created before
    angular.module('ShoppingList')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

      //Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');

      //*** Set up UI states ***
      $stateProvider

      //Home page
      .state('home', {
          url: '/',
          templateUrl: 'src/shoppinglist/templates/home.template.html'
      })

      //List page
      .state('mainList', {
          url: '/main-list',
          templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
          controller: 'MainShoppingListController as mainList'
      });
    }
})();
