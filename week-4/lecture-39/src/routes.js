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
          /*
          STEP 1: Set up "resolve" property
            "resolve" is a configuration object that has some key and value pairs

            We will be able to inject our "main-shoppinglist.controller.js" with yet another artifact by the name of "items" which matches exactly the key inside the resolve object

            If the resolve property gets assigned a promise which is also the case in this example, the router will not advance us to the new state in this case, "main-shoppinglist.template.html", until the promise is resolved

            If the promise gets rejected altogether, the router will not advance us to the new state at all

            The resolve properties can actually be anything we want to inject into their corresponding controller, don't have to be promises
          */
          resolve: {
              //protecting our function from minification like controllers...
              items: ["ShoppingListService", function(ShoppingListService) {
                  //The UI router will then wait for the items property to get resolved before it takes us to this mainList UI state
                  return ShoppingListService.getItems();
              }]
          }
      })

      /*
      URLs often encode a state of the view that requires more than just a name, it may require some actual data that can change how the view is constructed for the user, called PARAMETERS
      */
      .state("itemDetail", {
          /*
          STEP 1: Set up URL property with params
            Declare the URL property with a slash and the name with the parameter wrapped in curly braces

            Inject the special "$stateParams" service that UI-Router provides, either into our controller directly "ItemDetailController", or into the function that populates our result property data "resolve" property

            We could retrieve the value of the past in parameter by using the $stateParams service with the dot notation and the name of the parameter

            It is possible to specify the parameter using a regular expression
          */
          url: "/main-list/item-detail/{itemId}",
          templateUrl: "src/shoppinglist/templates/item-detail.template.html",
          controller: "ItemDetailController as itemDetail",
          resolve: {
              item: ["ShoppingListService", "$stateParams", function(ShoppingListService, $stateParams) {
                  //On success the async function is going to return the "items" array
                  return ShoppingListService.getItems().then(function(items) {
                      var item = items[$stateParams.itemId];

                      //Add an extra property "id" to item in order to access the index in the template html (otherwise would be impossible)
                      item.id = $stateParams.itemId;

                      return item;
                  });
              }]
          }
      });
    }
})();
