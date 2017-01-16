/*
STEP 1: Calling the function DESCRIBE
    Start all specs with calling the function "describe", which is a container for all the tests we're going to run

    The string is the title of the spec and the function is the spec, or test

    A spec with all true expectations is a passing spec

    A spec with one or more false expectations is a failing spec
*/
describe("CookieDetector", function() {
    var itemsWithCookies;
    var itemsWithoutCookies;

    /*
    STEP 2: Calling BEFOREEACH function
        You can specify a function called "beforeEach", the function value specified as the argument into the beforeEach function will be invoked once before each "it" spec is run, i.e. runs before each test

        This is very useful because before any test is run, we have to make sure that the conditions under which the test is running are identical to what we need them to be

        If your code changed some data as a result of some other test execution, and then we ran another test thinking that our application is in a certain state, when it's not
    */
    //I really didn't have to have the initialization sitting inside a for each as it doesn't really change from test to test
    beforeEach(function() {
        itemsWithCookies = ["apple", "Cookie", "orange"];
        itemsWithoutCookies  = ["apple", "milk", "orange"];
    });

    /*
    STEP 3: Calling "it" functions
        The "it" function is the actual test

        Note how the whole thing, the "describe" string and the "it" string, read like a specification together

        Jasmine provides a pretty extensive set of functions that you can use to test the result of your application code execution

        Note that the function names are also designed such that it reads like regular English

        In Jasmine, to negate a certain expectation statement you simply append the not property to it and continue calling verification statement
    */
    it("should be able to detect no cookies", function() {
        /*
        Expectations:
            Are assertions that are either true or false

            Are built with the function "expect" which takes a value, called the actual
            */
        expect(detectCookie(itemsWithoutCookies)).not.toBe(true);
    });

    it("should be able to detect cookies", function() {
        expect(detectCookie(itemsWithCookies)).toBe(true);
    });
});
