(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
/*
ADD CONTROLLER TO A DIRECTIVE:
    When we want to bundle behavior (add functionality) with the directive, we can declare a controller directly on the directive

    We could declare the controller used by the directive on the module itself

    Then we have a controller that we can now reference through the name as a String anywhere inside of this angular module, as angular will look up the string to see if there is any such component exists in this module

    So we can actually use this controller in more than one place

    We have a reusable controller and not that just in this file because here obviously, in this file we could reuse this function without any problems, but if it was in a different file and we're still working of the same module, if we left this just as a regular local function, inside of this if function it won't be visible. However once we stack it is a declared controller on the angular module, any where this module is being referenced, we're going to actually retrieve this controller and reuse it

    STEP 1: register the controller into the module (optional)
*/
.controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
.directive('shoppingList', ShoppingListDirective);


function ShoppingListDirective() {
  var ddo = {
    templateUrl: 'template/shoppingList.html',
    scope: {
      items: '<',
      title: '@'
    },
    /*
    STEP 2: Attach the controller to a directive

    The value of that property should be:
        1) a function that will implement that controller

        2) a string using controller as syntax IF, AND ONLY IF, the controller has been registered into the module

    The properties that are declared in our isolate scope, would now be available on the $scope inside of our controller
    */
    //2)
    controller: 'ShoppingListDirectiveController as list',
    //1)
    //controller: "ShoppingListDirectiveController,

    /*
    Tells angular to place our isolate scope properties after the controller instance instead of directly on the $scope instance
    */
    bindToController: true

    /*
    Specifies the label in our Controller As Syntax so we can use that label to refer to scope properties and methods in the html template
    */
    //controllerAs: 'list',
  };

  return ddo;
}

/*
STEP 3: Implement the controller function
*/
function ShoppingListDirectiveController() {
  var list = this;

    /*
    Note one obvious point, since we declared our directive scope to be isolate scope, anything we attach to that scope is still inside the isolate scope and not just what was mapped through the scope declaration in the DDO

    We can use this method inside the HTML template used by the directive

    Really the error message should be part of the shopping list directive. After all, the shopping list knows about the items in the list and it can decide whether or not an error message should be displayed
    */
  list.cookiesInList = function () {
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };
}


ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items )";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items )";
  };

  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
    list.title = origTitle + " (" + list.items.length + " items )";
  };
}


// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
