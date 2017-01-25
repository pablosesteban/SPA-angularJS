/*
CALLBACK FUNCTION:
    Is a function that is passed to another function (let’s call this other function “otherFunction”) as a parameter, and the callback function is called (or executed) inside the otherFunction

ASYNCHRONOUS BEHAVIOR:
    You would have some asynchronous function, and you would pass as an argument a function value (callback) that would get executed once the asynchronous behavior was complete

    The problem with this model is that there's not really an easy, straightforward way to task the results of the asyncFunction back to the caller if the real recipient of the result is a few layers away

    That's not a very trivial thing to accomplish with a callback approach, but with a Promise API, we can actually get all these things accomplished fairly easily

PROMISES:
    Promise API is actually part of the new ES6 API, however, not all browsers implement ES6 API yet, so Promise object might not be available

    AngularJS implements its own Promise API that's very similar

    A Promise is an object which can be passed around or returned that holds references to the outcome of asynchronous behavior

    In Angular, promises are created through the special service called the $q Service
*/
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

        /* VERSION 1.0 */
        this.addItem = function(name, quantity) {
            /*
            STEP 5: call asynchronous function
                Call our asynchronous function and to capture a reference to the promise object
            */
            var promise = WeightLossFilterService.checkName(name);

            /*
            STEP 6: then() method
                Then wherever my application is appropriate, I could call the then() function on my promise and extract the results or handle the error

                Takes two arguments which are functions themselves, first one to handle the success of execution, and second one to handle the failure
            */
            promise.then(
                //SUCCESS
                function(response) {
                    var nextPromise = WeightLossFilterService.checkQuantity(quantity);

                    nextPromise.then(
                        //SUCCESS
                        function(nextResponse) {
                            items.push({
                                name: name,
                                quantity: quantity
                            });
                        },
                        //FAILURE
                        function(error) {
                            console.log(error.message);
                        });
                },
                //FAILURE
                function(error) {
                    console.log(error.message);
                });
        }

        /* VERSION 2.0 */
        this.addItem = function(name, quantity) {
            var promise = WeightLossFilterService.checkName(name);

            /*
            STEP 6: then() method
                Is also chainable because it itself returns a promise

                Both codes run serial wise, i.e. the second function waits until the first one ends to run

                If there is an error it will go ahead and bubble up and propagate
            */
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
            )
            /*
            Place to handle any errors that come from any of the promises

            Will get executed when reject() gets invoked

            We no longer have to handle the error condition or the rejection of the promise in every single case

            Much readable and cleaner
            */
            .catch(function(error) {
                console.log(error.message);
            });
        }

        /* FINAL VERSION */
        this.addItem = function(name, quantity) {
            /*
            $q.all() method
                Resolve multiple promises asynchronously, so no promise has to wait for another to complete in order to even start running

                Both functions runs in parallel
            */
            $q.all([
                WeightLossFilterService.checkName(name),
                WeightLossFilterService.checkQuantity(quantity)
            ])
            /*
            Central place to handle all the results that come from any of the promises

            Will only get executed once every single promise in the array is resolved

            However,
            */
            .then(
                function(nextResponse) {
                    items.push({
                        name: name,
                        quantity: quantity
                    });
                }
            )
            /*
            Central place to handle any errors that come from any of the promises

            If any of the promises in the array result in a rejection, all promises will be cancelled immediately and, the execution will jump here
            */
            .catch(function(error) {
                console.log(error.message);
            });
        }

        this.removeItem = function(index) {
            items.splice(index, 1);
        }
    }])

    .service("WeightLossFilterService", ["$q", "$timeout", function($q, $timeout) {
        /*
        ASYNCHRONOUS FUNCTION
        */
        this.checkName = function(name) {
            //The result that will return the promise both on success or fail (with different message)
            var result = {
                message: ""
            };

            /*
            STEP 1: $q.defer() method
                Creates an object that represent the asynchronous environment with all the hooks into it including the promise object
            */
            var defered = $q.defer();

            /*
            SIMULATE THE ASYNCHRONOUS BEHAVIOUR ($timeout)
                resolve() and reject() can be part of something that truly runs asynchronously
            */
            $timeout(function() {
                if (name.toLowerCase().indexOf("cookies") === -1) {
                    /*
                    STEP 2: resolve() method
                        After we implement some behavior that object has a special method called resolve that marks a successful completion of our execution and then wraps the data for the promise to retrieve later on

                        We're wrapping the result object or some result as part of our resolve method call
                    */
                    defered.resolve(result);
                }else {
                    result.message = "Stay away from cookies!";
                    /*
                    STEP 3: reject() method
                        If something goes wrong we will mark unsuccessful completion and will also wrap some data for the promise using an error object or some error message
                    */
                    defered.reject(result);
                }
            }, 3000);

            /*
            STEP 4: return the promise
                We have to return our promise to the caller of this function

                Sends back the promise object to the caller, which is really a hook back to the life cycle of this entire process
            */
            return defered.promise;
        }

        /*
        ASYNCHRONOUS FUNCTION
        */
        this.checkQuantity = function(quantity) {
            var result = {message: ""};

            var defered = $q.defer();

            /*
            SIMULATE THE ASYNCHRONOUS BEHAVIOUR ($timeout)
            */
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
