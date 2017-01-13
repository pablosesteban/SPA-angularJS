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
          controller: 'MainShoppingListController as mainList',
          resolve: {
              //protecting our function from minification like controllers...
              items: ["ShoppingListService", function(ShoppingListService) {
                  //The UI router will then wait for the items property to get resolved before it takes us to this mainList UI state
                  return ShoppingListService.getItems();
              }]
          }
      })

      /*
      UI-ROUTER EVENTS:
        Router has different events that occur as the router performs its functions

        Since the router does a lot of things in the background, including potentially reaching out to a server and fetching data, it's very useful to be able to show to the user that the application is working on something

        All your router events are fired at the $rootScope level, i.e. all events broadcast down the document object model tree for any node to potentially respond to the event

        Some events are:
            $stateChangeStart: fires when the state change transition begins (show spinner)

            $stateChangeSuccess: fires when the state change transition is completed (hide the spinner)

            $stateChangeError: fires when an error occurs during the transition

        NOTE THAT:
            If any errors occur in your result function, they will not be thrown traditionally, i.e. you will not see any errors in the console and everything will appear normal, when in fact, there's an error

            You have to listen for the $stateChangeError event to catch all errors that occurred during state changes

        If you wanted to catch the transition right when it starts some data evaluation, stop the transition from recurring, you can call "event.preventDefault()" method on the event object to stop the transition from going forward, essentially cancelling it
      */
      .state("mainList.itemDetail", {
          url: "/item-detail/{itemId}",
          templateUrl: "src/shoppinglist/templates/item-detail.template.html",
          controller: "ItemDetailController as itemDetail"
      });
    }
})();
