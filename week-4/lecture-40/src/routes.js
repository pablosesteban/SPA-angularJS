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
          Sometimes it just doesn't make sense for a view to be declared and treated as its own UI state but as a CHILD STATE (with their own view) of another state

          The two views is often refer to as the MASTER VIEW PAIR, and usually both are in the same screen (not always)

          UI router CHILD STATES, INHERITS "resolves", and "custom data properties" from the PARENT STATES, what this means is that if the parent state already made the call to the server and retrieved the data, the child state need not repeat the process, it can simply use the parent's existing data without making another server call
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
      STEP 1: Declares the child state
        Usually declared with a . notation specifying the "parent state name.child state name"

        The child has its its own URL assigned, its URL is concatenated to the URL declared for the parent "parent state url/child state url"
      */
      .state("mainList.itemDetail", {
          /*
          url property is optional but if we ommit it here (then the url is not going to change), the "ItemDetailController" is going to miss the parameter expected

          To solve, this, you can use the "params" property to refer to them wihtout using the url property
          */
          url: "/item-detail/{itemId}",
          templateUrl: "src/shoppinglist/templates/item-detail.template.html",
          controller: "ItemDetailController as itemDetail",
          /*
          params: {
              itemId: null
          }
          */

          /*
          Here we are executing the async function again (in real world, would be a call to service) that gives us the "items"

          Using child states, we can get the "items" (gathered before in "mailList" state) from the parent state "mainList" without to make a call to a service again, INJECTING the "items" resolve property of the parent in the CONTROLLER "ItemDetailController"

          So it is not necessary anymore

          resolve: {
              item: ["ShoppingListService", "$stateParams", function(ShoppingListService, $stateParams) {
                  return ShoppingListService.getItems().then(function(items) {
                      var item = items[$stateParams.itemId];

                      //Add an extra property "id" to item in order to access the index in the template html (otherwise would be impossible)
                      item.id = $stateParams.itemId;

                      return item;
                  });
              }]
          }
          */
      });
    }
})();
