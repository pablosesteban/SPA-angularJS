/*
Traditional Client-Server Communication (Web 1.0):
    Any update that the browser needed was handled by the server, the routing from field to another in a web application was a server side responsibility

    This was a slow experience for the user passing around essentially the same content, over and over

With the introduction of AJAX:
    Browsers make a background request to the server, which only returned the needed data

    It was now the browsers job through JavaScript to take the data in this fine grained upgrade and dynamically insert it into the page that was already on the user screen

    However, there was a disadvantage with this approach. If the user wanted to go to the previous state of the view, before they clicked on something, that made a role to remind UI update the good old back button on the browser would not work

    The reason this was happening was because it was still the server, not the browser, that was responsible for the routing from view to view in the web application

Angular SPA applications:
    The beginning of the client's server interaction is the same, the browser requests some index.html, and the server responds with the content which comes along with CSS and JavaScript

    When the user clicks on the URL that's supposed to take them to a new view, the URL is constructed with the same index that HTML is before, but it gets followed by a pound sign "#" that does not cause the browser to request anything from the server, but can be detected by JavaScript in that process

    The JavaScript in the browser is what processes the URL change, using the pound sign or the hashtag works for a browser-only routing because the hashtag on the URL does not cause the browser to re-request the resource from the server

    Another way to approach navigation from one view to the next does not depend on the URLs. In it, we represent each view as a view state, i.e. represent the view using some JavaScript object that holds the data to reproduce the same visual setup over and over, including the data associated with that state

    This is a much more generic way of approaching the whole idea of representing the state of a user interface at some particular point in time

    We can encode the save data using a Java Script object in simply tell on navigatius system to recreate a user interface base of an object, so the point such setup is that your role on the browser address bar is not updated, only programmatic state of the view is a updated
UI-ROUTER
    Made as a separate JS file

    The routing does NOT rely on the server anymore but in the browser, javascript do it! "#" sign inside the browser url is used to NOT go to the server to look for that path!

    An open source project that's develop by the community

    UI state is a central concept, so you can have a route with no unique URL for that route:
        UI router handles UI states in routing through a URL as two independent functions, it all makes sense why it comes with two essential services, $state and $uiRouter, along with two providers, $stateProvider and $urlRouteProvider, to configure them before they are instantiated


    URL routing is is also supported so you can have a state that is associated with a particular URL and UI state is updated based on that URL

    Nested views are supported
*/
(function() {
    /*
    STEP 3: Declare as a dependency
    */
    angular.module("RoutingApp", ["ui.router"])

    /*
    Congifuration of the services using the providers in config() method
    */
    .config(RoutesConfig);

    RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        console.log("Routes Configuration!");

        /*
        Configure the UI routes
            Tells the UI router that when it tries to match a browser URL with a URL associated with a particular declared state and it can't find any matches, it should default to the URL declared in the otherwise method
        */
        $urlRouterProvider.otherwise("/");

        /*
        Configure our UI states
            Give each state a unique name that we'll be able to refer to throughout our application and an object literal with a URL template and OPTIONALLY an URL with a particular UI state

            The URL template will be retrieved from the server using AJAX if and when this state is activated, and then insert it into the ui-view tag

            The state method is chainable
        */
        $stateProvider
        .state("tab1", {
            //OPTIONAL: UI states and UI routes are separate and modifies the browser navigation bar pointing to this url
            url: "/tab1",
            templateUrl: "src/view1.html"
        })
        .state("tab2", {
            //Without an url, the browser navigation bar does not change (point where it was), only change the UI state. Meaning cannot use the go back button on browser
            templateUrl: "src/view2.html"
        })
        .state("tab3", {
            url: "/tab3",
            template: "<h3>View 3</h3>"
            /*
            Just like with any template, the HTML we provide in the file pointed to by the state's template URL property, we can declare a controller as responsible for the view model or the behavior associated with that HTML

            controller: "controller as syntaxt",

            or

            controller: Controller,
            controllerAs: "label"
            */
        });
    }
})();
