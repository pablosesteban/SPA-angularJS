(function() {
    angular.module("MenuApp")

    .component("items", {
        templateUrl: "src/templates/items_component.template.html",
        bindings: {
            menuItems: "<"
        }
    });
})();
