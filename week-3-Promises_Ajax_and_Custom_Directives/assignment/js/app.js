(function() {
    angular.module("NarrowItDownApp", [])

    .controller("NarrowItDownController", NarrowItDownController)

    .service("MenuSearchService", MenuSearchService)

    .directive("foundItems", FoundItemsDirective)

    .constant("RestApiUrl", "https://davids-restaurant.herokuapp.com/menu_items.json");

    function FoundItemsDirective() {
        //return the DDO
        return {
            templateUrl: "loader/itemsloaderindicator.template.html",
            scope: {
                foundItems: "<found",
                removeItem: "&onRemove"
            }
        };
    }

    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;

        this.search = function(searchedTerm) {
            MenuSearchService.getMatchedMenuItems(searchedTerm).then(function(foundItems) {
                ctrl.foundItems = foundItems;

                console.log(ctrl.foundItems.length);
            });
        }

        this.removeItem = function(index) {
            this.foundItems.splice(index, 1);

            console.log(this.foundItems.length);
        }
    }

    MenuSearchService.$inject = ["$http", "RestApiUrl"];
    function MenuSearchService($http, RestApiUrl) {
        this.getMatchedMenuItems = function(searchedTerm) {
            return $http.get(RestApiUrl)
            .then(function(response) {
                var foundItems = [];

                var menuItems = response.data.menu_items;

                angular.forEach(menuItems, function(element, index, arr) {
                    if (searchedTerm && searchedTerm.trim().length !== 0 && element.description.indexOf(searchedTerm) !== -1) {
                        foundItems.push(element);
                    }
                });

                return foundItems;
            });
        }
    }
})();
