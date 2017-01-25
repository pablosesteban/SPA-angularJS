/*
TESTING SERVICES
    Testing services that reach out to the server through the network for some service side data could be complex

    There is a special Angular-provided "$httpBackend" service:
        Intercepts calls to the server and then lets you simulate server response

        All without making any network requests

        Has numerous methods that correspond to other type of requests (GET, POST...)
*/
describe("MenuCategoriesService", function() {
    //To use globally inside the spec
    var menuCategoriesService;
    var $httpBackend;
    var ApiBasePath;

    beforeEach(function() {
        angular.mock.module("MenuCategoriesApp");

        /*
        STEP 1: Get a hold of the regular Angular "$injector" service
            $injector service:
                Is what Angular uses behind the scenes to do the injection for us

                But we can also use it to retrieve instances of artifact like our services from the module where attach that service too

                The way we retrieve our service is through the "get()" method of the injector service, passing it the string name we registered our service with the module

            If our service provides simple utility methods or just used for data sharing, and it doesn't try to reach out over the network to communicate with the server, we can stop here

            If the service uses the HTTP service, we need to retrieve the mock version of that service that Angular provides
        */
        angular.mock.inject(function($injector) {
            /*
            Notice that we also are not injecting anything manually inside the MenuCategoriesService, even though it requires some injections

            Angular will take care of that for us automatically
            */
            menuCategoriesService = $injector.get("MenuCategoriesService");
            $httpBackend = $injector.get("$httpBackend");
            ApiBasePath = $injector.get("ApiBasePath");
        });
    });

    /*
    STEP 2: Create the test using the $httpBackend service
        Tell the $httpBackend service what HTTP call to expect, to which URL and what to respond to such a call using the "whenGET()" method

        Tell what shoul be the response of that sercive using the "respond()" method

        The last thing that we must do, is call its "flush()" method:
            In the real use of our app, the $http service always responds asynchronously

            If we were to preserve that behavior 100%, we keep the call asynchronous so tell the $httpBackend service to flush pending requests immediately after we set it up
    */
    it("should return categories list", function() {
        $httpBackend.whenGET(ApiBasePath + "/categories.json").respond(["Lunch", "Dessert"]);

        menuCategoriesService.getMenuCategories().then(function(response) {
            expect(response.data).toEqual(["Lunch", "Dessert"]);
        });

        $httpBackend.flush();
    });
});
