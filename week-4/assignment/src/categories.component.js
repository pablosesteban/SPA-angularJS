(function() {
    angular.module("MenuApp")

    .component("categories", {
        templateUrl: "src/templates/categories_component.template.html",
        bindings: {
            menuCategories: "<"
        }
    });
})();
