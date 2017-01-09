/*
Providing Data from Directive to Parent Controller:
    There are times when it makes sense that the directive should invoke a method on its parent passing it some data only our directive would know about

    Say you have a directive like the one we've been working with that's responsible for displaying the shopping list. It may also be responsible for providing a button to remove an item from the list. However, it's the parent that's in charge of that data. The shopping list directive only displays the list. It has no idea, and shouldn't have any idea what should happen if someone wants to remove something from the list. Maybe some side effect needs to occur that has nothing to do with the responsibilities of our directive. The actual data manipulation like removal of an item needs to happen in the parent controller

    In other words we need to set up a link from the directive to some method on the parent and then provide some data from the directive to that parents method for execution. However, we must be careful the parent has to execute that method in the parents context not in a directives context
*/
(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
.directive('shoppingList', ShoppingListDirective);


function ShoppingListDirective() {
  var ddo = {
    templateUrl: 'template/shoppingList.html',
    scope: {
      items: '<',
      myTitle: '@title',

        /*
        STEP 2: Declare method reference in directive
             The property name will serve as the reference to pass in the method that exist on a parent controller scope, used in the HTML template used by this directive

             The property value, the ampersand sign will be followed by the name method, is what we'll need to use in the parents HTML template, to pass in the reference to the parent method

             "&" binding allows us to execute an expression (such a function value) in the context of the parent scope
        */
        removeItem: "&onRemove",
        badRemove: "="
    },
    controller: 'ShoppingListDirectiveController as list',
    bindToController: true
  };

  return ddo;
}

function ShoppingListDirectiveController() {
  var list = this;

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

    /*
    STEP 1: Define the  method in the controller
        Parent controller's method to be called with the itemIndex provided by the directive
    */
  list.removeItem = function (itemIndex) {
      //In order to know to which object the "this" keyword is pointing to when the method gets executed
      console.log("this keyword: ", this);

      //Assigned to "this", to whatever it points to
      this.lastRemoveItem = "Last item removed was " + this.items[itemIndex].name;

    shoppingList.removeItem(itemIndex);

    //Assigned to "this", to whatever it points to
    this.title = origTitle + " (" + list.items.length + " items )";
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
