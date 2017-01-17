/*
TESTING DIRECTIVES
    Our test has to create a mock environment similar to the one in which a directive usually runs
*/
describe("shoppinglist directive", function() {
    var $rootScope;
    var $compile;

    beforeEach(angular.mock.module('ShoppingListDirectiveApp'));

    /*
    STEP 1: Create a variable that will hold the string that is our expected directive output
        This is what is generate (compile) by angular when processing the directive
    */
    var expectedHtml = '<h3 class="ng-binding">Shopping List #1 (2 items)</h3>\
<ol>\
  <!-- ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope">\
    1 of item 1\
    <button ng-click="list.removeItem($index);">Remove Item</button>\
  </li><!-- end ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope">\
    2 of item 2\
    <button ng-click="list.removeItem($index);">Remove Item</button>\
  </li><!-- end ngRepeat: item in list.items -->\
</ol>'.replace(/\s/g, '');

    /*
    STEP 2: Inject $compile and $rootScope services
        $rootScope service:
            Our directive usually lives inside of some scope, but as everything else in our app, it certainly is inside of the top level scope, which is the $rootScope

            We'll be simulating placing our directive as a direct child of the element with the ng-app attribute

        $compile service:
            Takes our source HTML and, using JavaScript, compiles it

            Converts all that special syntax like directives, components, interpolation, into DOM, or document object model, that any browser can understand as well as associating functionality with those components
    */
    beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    /*
    STEP 3: Get the url template of the directive
        If your directive doesn't have a template, or has one that embeds it directly in the directive definition object, you can skip this step

        If it references a template using templateUrl property, this step is needed

        When the directive uses a template URL, Angular uses Ajax to asynchronously request a template file, but this is an issue for us because we don't want to deal with asynchronous behavior in our test

        We could use the HTTP back end service to simulate the response, but then we would end up hard coding HTML of our template in our test and would make our test stuck with the version of the template we have for now

        $templateCache" service:
            When Angular loads templates of directives or components, the first thing it does is check if that template already exists in the "$templateCache" service

            If it does exist, Angular simply uses the cached version, and doesn't try to make an asynchronous request to get it again

            If it's not in the cache, it makes the request
    */
    beforeEach(inject(function($templateCache) {
        //Ajax call
        var directiveTemplate = null;
        var xmlHttpReq = new XMLHttpRequest();

        xmlHttpReq.onload = function() {
            directiveTemplate = this.responseText;
        }

        //The way we disable the request from being asynchronous is by passing false as the last argument
        xmlHttpReq.open("get", "template/shoppingList.html", false);
        xmlHttpReq.send();

        //If we manually place our template into the $templateCache, we are actually blocking HTTP request to load the the directives template into the cache
        //The key string MUST be the path where is the template and of course the same as in the ajax call
        $templateCache.put("template/shoppingList.html", directiveTemplate);
        console.log($templateCache.get("template/shoppingList.html"));
    }));

    /*
    STEP 4: Create the spec
        The first thing we do is place a "list" object onto the $rootScope, with the property named "items" which is what our directive expects to be there so it can be passed into our directive as an attribute

        Then we create the HTML for the directive as we would when we place that directive directly inside of the index.html or any other HTML template

        The next step is to compile our directive HTML

        Note that the compile service itself returns a function. This is the function that needs some scope as an argument in order to bind the data with the newly compiled HTML, the $rootScope which contains the property "list" we need for our directive to work

        Kick off Digest Cycle on the $rootScope:
             The first thing that happens when an Angular application initializes is the running of the $digest cycle

             This is needed in order to kick off whatever watches are set up and to update the views with the data

             Since we're not standing up the whole app, but are just testing, we need to kick off that process manually

             After that call, the produced HTML is updated with data and is ready to be tested for expectations
    */
    it("replace the element with the appropriate content", function() {
        //the list object that the template is expecting to be in the scope
        var list = {};

        list.items = [
        {
            name: "item 1",
            quantity: "1"
        },
        {
            name: "item 2",
            quantity: "2"
        }];

        $rootScope.list = list;

        //HTML with the directive to compile it
        var html = '<shopping-list my-list="list" title="Shopping List #1 (2 items)"></shopping-list>';

        //return an DOM html element
        var element = $compile(html)($rootScope);

        $rootScope.$digest();
        console.log("Element: ", element.html().replace(/\s/g, ''));
        console.log("Expected: ", expectedHtml);
        expect(element.html().replace(/\s/g, '')).toContain(expectedHtml);
    });
})
