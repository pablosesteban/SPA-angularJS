(function() {
    'use strict';

    angular.module("MenuCategoriesApp", [])

    .controller("MenuCategoriesCtrl", ["MenuCategoriesService", function(MenuCategoriesService) {
        /*
        NEEDED!!!!
        */
        var menu = this;

        var promise = MenuCategoriesService.getMenuCategories();

        promise
        .then(function(response) {
            /*
            WATCH!!
            CANNOT USE THIS INSIDE IT!!!!!!
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
                console.log(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }])

    .service("MenuCategoriesService", ["$http", "ApiBasePath", function($http, ApiBasePath) {
        this.getMenuCategories = function() {
            return $http.get(ApiBasePath + "/categories.json");
        }

        this.getMenuForCategory = function(categoryShortName) {
            return $http({
                method: "GET",
                url: ApiBasePath + "/menu_items.json",
                params: {
                    category: categoryShortName
                }
            });
        }
    }])

    .constant("ApiBasePath", "http://davids-restaurant.herokuapp.com");
})();
