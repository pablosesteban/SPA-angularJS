(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory)

.directive('shoppingList', ShoppingList);

/*
ISOLATE SCOPE:
    It would be better to break away from this directive scope inheritance (the $scope inside of our directive was the exact same object as the $scope of our directive's parent controller) and create an isolated scope for our directive

    Breaks the directive prototypal inheritance of the scope from the parent

    Makes the directive more independent, therefore less coupled with the controller, or whatever parent component the directive is living in
*/
function ShoppingList() {
  var ddo = {
    templateUrl: 'template/shoppingList.html',
      /*
      The way to isolate the scope of a directive is accomplished is through specifying another property on the DDO called "scope" and assigning it some object

      If it's isolated, how do we get the data that we need into our directive? -> Explicitly bind pre-defined attributes to the isolate scope properties

      Two ways of isolate scope binding:
            Bidirectional Binding:
                "=attributeName" or "=?"

                The most communicative way, meaning that if you change the parent value the value in the directive will change automatically and vice versa

                If you leave the value as simply an equal sign (=), AngularJS compiler will assume that the name of the attribute in the HTML template is the same as your directives property name

                If you follow the equals sign with a question mark (=?), that will signify to the Angular compiler that the name of the attribute in the HTML template is the same as your directives property name and it is optional, so the code in your directive has to be aware that it's possible that the user of your directive will not supply a value for the scope property so you cannot rely on that value to be there, as it might be undefined

            One Way Binding:
                "@attributeName" or "<"

                The result value that's assigned the property in our directive scope in this setup is always a STRING

                The outer value (DOM's value attribute) change affects the inner value but if we explicitly change the property that's bound to the attribute in side of the directive the value of the attribute DOM node will be unaffected

        Bidirectional VS One Way Binding:
            It is a best practice to try to avoid changing the values inside the directive: DO NOT use this approach if we have no plans of changing the bound value inside of the directive, we are wasting resources because angular is setting up extra watches inside of our directive that will be always checked but never used

            Obviously, one-way binding does not change how JavaScript fundamentally works. So, if you pass on the primitive like a number using one-way binding, one-way binding can guarantee that the value outside the directive will not be affected by anything you do in the directive with a pass in value. However if you pass in an object and your directive changes the value of a property of that object, while no watches will be set up or triggered as a result, the context outside your directive will definitely be affected since the change will be visible outside of the directive
      */
    scope: {
        /*
        We're specifying properties on the scope object to bind and pass the outer values (controller properties) into the directive:
            The property values are going to be attributes we can use in our directive in the HTML page

            The property names are going to be the names we use inside the HTML templates used by this directive

        In the HTML template and HTML using the directive, we use the same normalization rules for those attributes we use for the directive name when is registered!
        */
      list: '=myList',
        /*
        We want the parent controller to decide what the title would be, even though the parent controller wouldn't know where the title goes

        But the actual title words is something that the parent controller knows about and it should be in control of that, but the directive should be the one displaying it

        So it sounds like a perfect use case for the one-way binding with an at sign
        */
      title: '@title'
    }
  };

  return ddo;
}

// LIST #1 - controller
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {
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

      //CHANGE WHENEVER THE LENGHT CHANGES
    list.title = origTitle + " (" + list.items.length + " items )";
  };

  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);

      //CHANGE WHENEVER THE LENGHT CHANGES
    list.title = origTitle + " (" + list.items.length + " items )";
  };
}


// LIST #2 - controller
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory(3);

  list.items = shoppingList.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    try {
      shoppingList.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }

  };

  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
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
