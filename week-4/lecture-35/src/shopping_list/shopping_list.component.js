(function () {
    'use strict';

    angular.module('ShoppingList')

    .component("shoppingList", {
        templateUrl: 'src/shopping_list/shopping_list.template.html',
        controller: ShoppingListComponentController,
        bindings: {
            items: '<',
            myTitle: '@title',
            onRemove: "&"
        }
    });

    //This controller could be in a separate file and registered with the module
    ShoppingListComponentController.$inject = ["$element", "$scope", "$rootScope", "WeightLossFilterService", "$q"];
    function ShoppingListComponentController($element, $scope, $rootScope, WeightLossFilterService, $q) {
        //local variable, can be any allowed name but naming the same as in the component template
        var $ctrl = this;

        //Total items in our shopping list, in order to use the $doCheck() method for comparison
        var totalItems;

        $ctrl.remove = function(itemIndex) {
            $ctrl.onRemove({index: itemIndex});
        }

        $ctrl.$onInit = function() {
            //Initialized once
            totalItems = 0;

            console.log("$onInit() executed!");
        }

        $ctrl.$onChanges = function(changeObject) {
            console.log("$onChanges() changeObject: ", changeObject);
        }

        $ctrl.$doCheck = function() {
            if (totalItems !== $ctrl.items.length) {
                $rootScope.$broadcast("shoppingList:processing", {on: true});

                totalItems = $ctrl.items.length;

                var promises = [];
                for(var i = 0; i < $ctrl.items.length; i++) {
                    promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
                }

                $q.all(promises)
                .then(function(response) {
                    $element.find('div.error').slideUp(900);
                })
                .catch(function(error) {
                    $element.find('div.error').slideDown(900);
                })
                .finally(function() {
                    $rootScope.$broadcast("shoppingList:processing", {on: false});
                });
            }
        }
     }
})();
