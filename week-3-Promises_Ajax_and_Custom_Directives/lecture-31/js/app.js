/*
Manipulating the DOM with Link Function:
    In the Model View, View Model Architecture, or the MV-VM design pattern has been a clear indication that we do not want to directly manipulate the DOM ourselves, but sometimes we want

    Angular exposes a water down version of jQuery right at the box called "jqLite", and also allows you to use the full version of jQuery library by simply including it without having to configure anything else

    Angular also provides a special window into the DOM manipulation through the directives "link" property, which holds a function
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
        removeItem: "&onRemove",
        badRemove: "="
    },
    controller: 'ShoppingListDirectiveController as list',
    bindToController: true,

    /*
    STEP 1: Declaring the Link Function
        Site where we do everything related to DOM manipulation by directly updating it and registering native event listeners

        This function is the place for setting up watchers, instead of setting them up inside controllers

        This function algo has access to the same $scope and properties that a controller does, so it could take over all of the controller's responsibilities
    */
    link: ShoppingListDirectiveLink
  };

  return ddo;
}

/*
STEP 2: Define the Link Function
    Link Function is always called with specific parameters so we don't inject anything into the LinkFunction directly

    Parameters:
        scope:
            we omit the $scope is to remind ourselves that the scope is not injected into the Link Function

            you can read and attach properties on the scope just like you would inside of a controller
        element:
            represents the top level element of the directive, i.e. either of that custom element that this directive defined or the element this custom directive is declared as an attribute on

            on top of that, this element is a wrapper around the regular DOM element object with special functions that come from jqLite or jQuery if it is included in the main HTML page BEFORE the angularJS main file (supports many more selector query functions)
        attrs:
            is an object that contains references to the attributes declared on the element
        controller:
            is a reference to the controller declared for this directive, if there is one

    However, if we wanted to use some service, we can inject it into the directive factory function and then use it inside of our Link Function

    Now we are able to manipulate the DOM and actually affect it and even use third-party libraries like jQuery, and obviously any other library we want, directly in the DOM and it's all compartmentalized inside of our directive
*/
function ShoppingListDirectiveLink(scope, element, attrs, controller) {
    console.log("scope: ", scope);
    console.log("element: ", element);
    console.log("attrs: ", attrs);
    console.log("controller: ", controller);

    scope.$watch("list.cookiesInList()", function(newVal, oldVal) {
        console.log("list.cookiesInList() Old Value: ", oldVal);
        console.log("list.cookiesInList() New Value: ", newVal);

        /*
        Using Angular jqLite
            only find by TAG NAME

            without linking the jQuery library to the HTML
        */
//        if (newVal === true) {
//            var elementDiv = element.find("div");
//
//            console.log(elementDiv)
//
//            elementDiv.css('display', 'block');
//        }else {
//            var elementDiv = element.find("div");
//
//            console.log(elementDiv)
//
//            elementDiv.find("div").css('display', 'none');
//        }

        /*
        Using Angular witj jQuery
            find like jQuery

            linking jQuery library BEFORE angularJS library in the HTML
        */
        if (newVal === true) {
            var elementDiv = element.find("div.error");

            console.log(elementDiv)

            elementDiv.fadeIn("slow");
        }else {
            var elementDiv = element.find("div.error");

            console.log(elementDiv)

            elementDiv.find("div").fadeOut("slow");
        }
    });
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
