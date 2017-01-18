(function() {
  "use strict";

  angular.module("common")
  .factory("loadingHttpInterceptor", LoadingHttpInterceptor);

  /*
  INTERCEPTORS
    Who is going to throw the spinner:activate event?
      We could try to throw the event everywhere in our system whenever we see that something asynchronous is about to happen (ajax calls)

      But there are times when we use the $http service without even knowing ourselves about it (templateUrl property)

    The $http service provides an ability for us to configure it:
      To actually plug in to the entire lifecycle of sending the request and receiving the request

      So we can kind of catch the request as it goes out and catch the response as it goes back in

      This is made through Interceptors

    An interceptor is a factory, meaning it's going to create a function for us and wait for the return value from the function
  */
  LoadingHttpInterceptor.$inject = ["$rootScope", "$q"];
  function LoadingHttpInterceptor($rootScope, $q) {
    var counter = 0;
    var loadingEventName = "spinner:activate";

    // retuns an object with three properties
    return {
      // a function that takes in a config object which basically is everything that's going to be needed for the $http service to make the request (url, request headers...)
      request: function(httpConfig) {

      },
      response: function(response) {

      },
      responseError: function(response) {

      }
    }
  }
})();
