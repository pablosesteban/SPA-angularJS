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
        var cancellers = [];

        this.$onInit = function() {
            //Recalls that this function return a CANCEL FUNCTION!
            var cancelListener = $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams, options) {
                console.log("$stateChangeStart called!");

                $ctrl.showSpinner = true;
            });

            cancellers.push(cancelListener);

            cancelListener = $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams, options) {
                console.log("$stateChangeSuccess called!");

                $ctrl.showSpinner = false;
            });

            cancellers.push(cancelListener);

            cancelListener = $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, options) {
                console.log("$stateChangeError called!");

                $ctrl.showSpinner = false;
            });

            cancellers.push(cancelListener);
        }

        //To destroy the listeners once there are no required!
        this.$onDestroy = function() {
            cancellers.forEach(function(cancelFn) {
                cancelFn();
            });
        }
    }
})();
