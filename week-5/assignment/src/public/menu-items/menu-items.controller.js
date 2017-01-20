(function() {
  "use strict";

  angular.module("public")
  .controller("MenuItemsController", MenuItemsController);

  MenuItemsController.$inject = ["menuItems"];
  function MenuItemsController(menuItems) {
    this.menuItems = menuItems.menu_items;
  }
})();
