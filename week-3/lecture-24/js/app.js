(function() {
    angular.module("ShoppingListPromiseApp", [])

    .controller("ShoppingListCtrl", ["ShoppingListService", function(ShoppingListService) {
        this.items = ShoppingListService.getItems();

        this.addItem = function() {
            ShoppingListService.addItem(this.itemName, this.itemQuantity);
        }

        this.removeItem = function(index) {
            ShoppingListService.removeItem(index);
        }
    }])

    .service("ShoppingListService", ["$q", "WeightLossFilterService", function($q, WeightLossFilterService) {
        var items = [];

        this.getItems = function() {
            return items;
        }

        /* VERSION 1.0
        this.addItem = function(name, quantity) {
            var promise = WeightLossFilterService.checkName(name);

            promise.then(
                function(response) {
                    var nextPromise = WeightLossFilterService.checkQuantity(quantity);

                    nextPromise.then(
                        function(nextResponse) {
                            items.push({
                                name: name,
                                quantity: quantity
                            });
                        },
                        function(error) {
                            console.log(error.message);
                        });
                },
                function(error) {
                    console.log(error.message);
                });
        }
        */

        /* VERSION 2.0
        this.addItem = function(name, quantity) {
            var promise = WeightLossFilterService.checkName(name);

            promise.then(
                function(response) {
                    return WeightLossFilterService.checkQuantity(quantity);
                }
            ).then(
                function(nextResponse) {
                    items.push({
                        name: name,
                        quantity: quantity
                    });
                }
            ).catch(function(error) {
                console.log(error.message);
            });
        }
        */

        /* VERSION FINAL */
        this.addItem = function(name, quantity) {
            $q.all([
                WeightLossFilterService.checkName(name),
                WeightLossFilterService.checkQuantity(quantity)
            ])
            .then(
                function(nextResponse) {
                    items.push({
                        name: name,
                        quantity: quantity
                    });
                }
            )
            .catch(function(error) {
                console.log(error.message);
            });
        }

        this.removeItem = function(index) {
            items.splice(index, 1);
        }
    }])

    .service("WeightLossFilterService", ["$q", "$timeout", function($q, $timeout) {
        this.checkName = function(name) {
            var result = {message: ""};

            var defered = $q.defer();

            //SIMULATE THE ASYNCHRONOUS BEHAVIOUR
            $timeout(function() {
                if (name.toLowerCase().indexOf("cookies") === -1) {
                    defered.resolve(result);
                }else {
                    result.message = "Stay away from cookies!";

                    defered.reject(result);
                }
            }, 3000);

            return defered.promise;
        }

        this.checkQuantity = function(quantity) {
            var result = {message: ""};

            var defered = $q.defer();

            //SIMULATE THE ASYNCHRONOUS BEHAVIOUR
            $timeout(function() {
                if (quantity < 6) {
                    defered.resolve(result);
                }else {
                    result.message = "Too much!";

                    defered.reject(result);
                }
            }, 1000);

            return defered.promise;
        }
    }]);
})();
