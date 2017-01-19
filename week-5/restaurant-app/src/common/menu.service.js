(function() {
  "use strict";

  /*
  We need to define the service in "common" module simply because when we go to the admin portion of this website, we're still going to need the categories, and we're still going to need all the data, so we might as well just centralize it
  */
  angular.module("common")
  .service("MenuService", MenuService);

  MenuService.$inject = ["$http", "ApiHost"];
  function MenuService($http, ApiHost) {
    this.getCategories = function() {
      // This $http service request is also get intercepted by the interceptor we defined
      return $http.get(ApiHost + "/categories.json").then(function(response) {
        return response.data;
      });
    }

    this.getCategoryItems = function(categoryShortName) {
      /*
      $http service get() method can have an optional config object that can be passed as the last argument used to generate the request

      It can have a "params" property where we must place the url parameters which will be interpolated on to the URL
      */
      var requestConfig = {};

      if (categoryShortName) {
        requestConfig.params = {category: categoryShortName};
      }

      // This $http service request is also get intercepted by the interceptor we defined
      return $http.get(ApiHost + "/menu_items.json", requestConfig).then(function(response) {
        return response.data;
      });
    }
  }
})();
