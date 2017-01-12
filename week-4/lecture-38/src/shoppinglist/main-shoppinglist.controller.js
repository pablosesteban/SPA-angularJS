(function () {
    'use strict';

    angular.module('ShoppingList')
    .controller('MainShoppingListController', MainShoppingListController);

    /*
    STEP 2: Inject the resolve property in the controller
        Just like we'll inject anything else that needs to be injected into our controller and protecting it from minification
    */
    MainShoppingListController.$inject = ['items'];
    function MainShoppingListController(items) {
        var mainList = this;

        //The state is in charge of getting it, just using the items we injected
        mainList.items = items;

        /*
        RESOLVE PROPERTY IN STATE ROUTE:
            We had our routing switched to a state which was configured with this controller

            As part of the very first action in the $onInit function, we reached out to an asynchronous service to retrieve the data we needed for that controller to function

            There's some disagreement in the community if this sequence of events is backwards or not and also looks a little bit weird that we switched to a view before we know whether or not there's any data in that view to begin with

            Some say it would be definitely better if part of the transition to the next view, the next state, we first retrieve the data needed and then simply pass that data to the controller
        */
        /* NO NEEDED ANYMORE
        mainList.$onInit = function () {
            console.log("Initialized: ", this);

            ShoppingListService.getItems()

            //Returns a promise!
            .then(function (result) {
                mainList.items = result;
            });
        };
        */
    }
})();
