/*
Transclude Directive to Wrap Other Elements:
    We passed in regular strings or objects into isolate scope of the directive, but sometimes what's needed is to pass an entire template

    Using transclude property in the DDO, allows you to wrap arbitrary content with your directive including expressions and function calls in your HTML that are evaluated not in the directives isolate scope, but in the parent scope

    Tipically example of a dialogue box, it has to be able to close, perhaps provide OK and Cancel buttons, but it also has to be generic enough to let its users provide the actual content for the dialogue box to display
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
    link: ShoppingListDirectiveLink,

    /*
    STEP 1: Set transclude property to true
    */
      transclude: true
  };

  return ddo;
}

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

    list.warning = "WARNING! WARNING! COOKIES DETECTED!";

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
