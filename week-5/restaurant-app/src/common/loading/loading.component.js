(function() {
  "use strict";

  angular.module("common")
  .component("loading", {
    template: '<img src="images/spinner.svg" alt="Loading Site..." ng-if="$ctrl.show">',
    controller: LoadingController
  });

  LoadingController.$inject = ["$rootScope"];
  function LoadingController($rootScope) {
    var cancelListener;

    this.$onInit = function() {
      this.show = false;

      // somewhere else in the system we'll throw an event called "spinner:activate"
      cancelListener = $rootScope.$on("spinner:activate", function(event, data) {
        this.show = data.on;
      });
    };

    // when this view is being unloaded, we'll want to destroy that listener
    this.$onDestroy = function() {
      cancelListener();
    }
  }
})();
