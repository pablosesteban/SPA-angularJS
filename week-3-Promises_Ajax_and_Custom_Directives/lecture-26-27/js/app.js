/*
Creating CUSTOM DIRECTIVES
*/
(function() {
    'use strict';

    angular.module("MyApp", [])

    .controller("MyCtrl", [function() {}])
    /*
    STEP 1: register the directive with angular module
        The same way you register controllers, services, factories and so on

        The first argument is the directive name which is a NORMALIZED name that will appear in HTML

        The second argument is the Factory function that returns what's called a DDO (Directive Definition Object) which is basically a configuration object that tells angular compiler how this directive should behave when angular finds this tag or element or attribute in our HTML

        The Factory function will execute ONLY ONCE and not everytime it finds our directive mentioned that now HTML, so since it's only going to get executed once you could use that function to perform any initializations you need besides obviously returning the special object DDO
    */
    .directive("myTag", MyTag)
    .directive("myTagDiv", MyTagDiv);

    /*
    STEP 2: define our Factory Function
        We can Inject other things

        It has to return de DDO
    */
    function MyTag() {
        /*
        The DDO consists of multiple properties that are defined in the AngularJS documentation

        The SCOPE of your DIRECTIVE will be the SAME scope of the CONTAINING CONTROLLER unless you specify otherwise, i.e. the $scope inside of our directive was the exact same object as the $scope of our directive's parent controller

        That type of setup makes a directive dependent on our particular controller, i.e. there's TOO MUCH COUPLING going on between the controller and the directive
        */
        var ddo = {
            //every time we use MyTag in our HTML the words Hello World will be displayed to the user
            template: "Your Name is: {{name}}"
        };

        return ddo;
    }

    function MyTagDiv() {
        var ddo = {
            //to point to a HTML template or HTML file
            templateUrl: "template/template.html",
            /*
            DDO restrict property:
                Tells AngularJS compiler where to detect your custom directive

                Default value is AE: "A" stands for attribute, and "E" stands for element that means that angular will look for your directive as being either an attribute or an element

                The best practice to restrict your directive to an attribute (A) if that directive is extending some behavior of some other element

                The best practice to restrict a directive to be an element if that directive is defining a component with some associated template

                It's a best practice NOT to use the class on CSS-based directives

                If you restrict a directive to be a one type and then you use that directive in a different fashion, Angular will not match that directive and will simply ignore it like anything else in your HTML then it's not supposed to process

                The associated template that comes with their particular directive has to make sense within the context to the HTML
            */
            restrict: "AE"
        };

        return ddo;
    }
})();
