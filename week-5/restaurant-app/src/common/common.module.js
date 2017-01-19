(function() {
  "use strict";

  /*
  Why did we split it up into common module?
    There will be things that are going to be needed only for the public portion of our website, but also going to be needed for the admin portion of our website as well

    So it sounds like we're going to need something that's going to contain them so both modules, our future administrator module and the public module, will reuse

    What we need is a separate module that both of our modules public and the future administrative module can depend on and then share

    Usually it is called "common"
  */
  angular.module("common", [])
  // Configure the $httpProvider service to use the interceptor we create
  .config(HttpConfig)
  .constant("ApiHost", "https://davids-restaurant.herokuapp.com");

  /*
  INTERCEPTORS
    Who is going to throw the spinner:activate event?
      We could try to throw the event everywhere in our system whenever we see that something asynchronous is about to happen (ajax calls)

      But there are times when we use the $http service without even knowing ourselves about it (templateUrl property)

    The $http service provides an ability for us to configure it:
      To actually plug in something to the entire lifecycle of sending the request and receiving the request

      So we can kind of catch the request as it goes out and catch the response as it goes back in (response or error)

    Those things we could plug in, are called Interceptors and tracks when a $http service request begins and finishes (intercepts our requests and responses)
  */
  HttpConfig.$inject = ["$httpProvider"];
  function HttpConfig($httpProvider) {
    /*
    The $httpprovider service has a special property called "interceptors" that holds an array of all these interceptors

    When the $http service goes out to do its job it first checks that array to see if it needs to have one of the interceptors works before the request process
    */
    $httpProvider.interceptors.push("LoadingHttpInterceptor");
  }
})();
