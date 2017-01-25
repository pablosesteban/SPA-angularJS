(function() {
  "use strict";

  angular.module("common")

  /*
  An interceptor is a factory, meaning it's going to create this function for us and wait for the return value from this function which could be an object or a function itself
  */
  .factory("LoadingHttpInterceptor", LoadingHttpInterceptor);

  LoadingHttpInterceptor.$inject = ["$rootScope", "$q"];
  function LoadingHttpInterceptor($rootScope, $q) {
    /*
    $http service request are asynchronous, a few requests can happen at the same time, so a few templates can be loading at the same time

    We wouldn't want to turn the spinner off completely when the first request came back while the second request is still pending

    Means we need a counter, an increment counter every time there's a new request and a decrement counter every time one of the requests comes back (good or wrong)

    We will wait until we decrement the counter to the point where there is nothing loading at all, so it's a 0, and then, we'll broadcast that you can go ahead and turn off
    */
    var counter = 0;
    var loadingEventName = "spinner:activate";

    // Interceptors retuns an object with three properties which are functions that are called at different points in the $http service request process
    return {
      /*
      Is expected to be a function that takes in a config object the interceptor is being called with, which basically is everything that's going to be needed for the $http service to make the request (url, request headers...)

      When the $http service makes a request, it's going to first go to this function right here before actually going out and making the request
      */
      request: function(httpConfig) {
        console.log("Interceptor request function: ", httpConfig);

        if (++counter === 1) {
          // Gives us an ability to broadcast the spinner event (turn on the loading indicator) when any $http service request is made
          $rootScope.$broadcast(loadingEventName, {on: true});
        }

        return httpConfig;
      },

      /*
      Called when the response comes back and everything went well
      */
      response: function(response) {
        console.log("Interceptor response function: ", response);

        if (--counter === 0) {
          // We can again broadcast again, with that same spinner event and turn off the loading indicator
          $rootScope.$broadcast(loadingEventName, {on: false});
        }

        // The last thing we need to do here is that we need to return the response from the $http service request to the caller
        return response;
      },

      /*
      Notice that you can have more than one interceptor attached to the $http service

      This function is called when a previous interceptor either threw an error or it resolved the rejection (something went wrong)
      */
      responseError: function(response) {
        console.log("Interceptor responseError function: ", response);

        if (--counter === 0) {
          // We can again broadcast again, with that same spinner event and turn off the loading indicator
          $rootScope.$broadcast(loadingEventName, {on: false});
        }

        /*
        The last thing we need to do here is that we need to reject the promise with the response from the $http service request

        All of this is being done with promises and if we don't reject this response, this call will still return to the caller but it will look like our promised result successfully

        The caller will then erroneously assume that the data being returned is the data it's looking for instead of the error
        */
        return $q.reject(response);
      }
    };
  }
})();
