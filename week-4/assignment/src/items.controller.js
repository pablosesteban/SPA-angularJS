(function() {
    angular.module("MenuApp")

    .controller("ItemsCtrl", ItemsCtrl);

    ItemsCtrl.$inject = ["menuItems"];
    function ItemsCtrl(menuItems) {
        this.menuItems = menuItems;
    }
})();
