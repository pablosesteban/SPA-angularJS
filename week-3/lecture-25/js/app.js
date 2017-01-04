(function() {
    'use strict';

    angular.module("MenuCategoriesApp", [])

    .controller("MenuCategoriesCtrl", ["MenuCategoriesService", function(MenuCategoriesService) {
        /*
        We have to make a reference to this object in order to use it inside the then() method!
        */
        var menu = this;

        var promise = MenuCategoriesService.getMenuCategories();

        promise
        .then(function(response) {
            /*
            CANNOT use "THIS" inside to refer to the CONTROLLER here!
            */
            menu.categories = response.data;
        })
        .catch(function(error) {
            console.log(error);
        });

        this.logMenuItems = function(short_name) {
            var promise = MenuCategoriesService.getMenuForCategory(short_name);

            promise
            .then(function(response) {
                /*
                The most used property of the response object will be the response data property

                That's the property that holds the response body

                If detects that the response body contains JSON, it will automatically transform the response body into a JavaScript object using the JSON parser
                */
                console.log(response.data);
            })
            .catch(function(error) {
                /*
                The same response object gets returned if an error occurs

                However, its data property will probably contain some server-generated HTML page explaining the error message, so it's usually not as useful for our programmatic needs
                */
                console.log(error);
            });
        }
    }])

    /*
    $http service:
        To make communication between your front end application and the server super simple and straightforward

        Since the HTTP service is, in it's essence asynchronous, it's based on the deferred and promised API exposed by the $q service

        The main methods in this service returns a promise which is then up to us to process

        Is itself a function, so you can actually call it directly

        It takes just one argument, a configuration object which Angular expects to have some pretty fine properties such as method, URL, and so on
    */
    .service("MenuCategoriesService", ["$http", "ApiBasePath", function($http, ApiBasePath) {
        this.getMenuCategories = function() {
            return $http.get(ApiBasePath + "/categories.json");
        }

        this.getMenuForCategory = function(categoryShortName) {
            return $http({
                //GET by default
                method: "GET",
                //REQUIRED
                url: ApiBasePath + "/menu_items.json",
                /*
                An object whose property names become parameter names and their corresponding values become the values for those parameters

                The parameter values are automatically URL encoded (replace spaces and other special characters to go into the URL)
                */
                params: {
                    category: categoryShortName
                }
            });
        }
    }])

    /*
    Define a constant in the module

    Define once, and it will never change for the duration of the application

    Then we can inject it into controllers, services, or other types of components
    */
    .constant("ApiBasePath", "http://davids-restaurant.herokuapp.com");
})();
