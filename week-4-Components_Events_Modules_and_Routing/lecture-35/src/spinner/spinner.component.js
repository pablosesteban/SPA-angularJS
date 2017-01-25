(function () {
    'use strict';

    angular.module('Spinner')

    .component("loadingSpinner", {
        templateUrl: "src/spinner/spinner.template.html",
        controller: LoadingSpinnerController
    });

    LoadingSpinnerController.$inject = ["$rootScope"];
    function LoadingSpinnerController($rootScope) {
        var $ctrl = this;

        var cancelListener = $rootScope.$on("shoppingList:processing", function(event, data) {
            console.log("Event object: ", event);
            console.log("Data object: ", data);

            if (data.on) {
                $ctrl.showSpinner = true;
            }else {
                $ctrl.showSpinner = false;
            }
        });

        this.$onDestroy = function() {
            cancelListener();
        }
    }
})();
