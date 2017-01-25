/*
JavaScript dynamic type nature comes at the cost of missing out on the immediate nature of error reporting that exists in strongly type languages like Java, so testing your JavaScript code before shipping it off to your users is very important

Modern day software development is rarely done without writing unit tests

UNIT TESTING:
    It is independent checking for proper operation of the smallest testable part of your application

    It's important to isolate the small piece of functionality you're testing from the rest of your application as much as possible

    Make sure you're testing just that small piece and not the entire system, we want to verify that just this small part functions as it should, the rest of the system doesn't matter (there's a place for whole system testing)

    Incorporating unit testing into your development process changes the way you approach the rest of software development process all together, i.e. you can't write functions that do 20 different things and then expected it to be small and testable, instead each function or component you test, has to be focused on a single function or small outcome

    Unit tests should also be written such that they're repeatable, this means that as you add more functionality to your code base, rerunning your existing unit tests and seeing them all pass should give you the confidence that your new code additions did not break some existing functionality

What happens if your small unit of code has a fairly large and complex dependency? -> You still need to test just that small unit of code without the dependency, and the answer to that problem is mocking

MOCKING:
    Is a technique where dependency and its behavior is imitated or otherwise just known faked

    It can be done directly by the developer or a mocking library

    A mocking library will usually provide a more complex or perhaps a more generic interacting with some functionality that you're trying to mock

It's easier to use a testing framework that comes with a bunch of tools to help you with set up of your tests, providing methods that help you verify the result you got was the result you expected and so on

JASMINE:
    Is a very popular JavaScript testing framework and one that works very well when testing Angular code

    You can use Jasmine as a standalone browser based testing framework or command line one (create scripts that automate your testing)

    Once you downloaded and unzipped the release version, you erase everything in the "src" and the "spec" directories

    Then, you place your own application code into the src directory and you place your test code or spec code into the spec directory

    The reason we're calling our test "specs" has to do with our approach called "Behavior Driven Development" or BDD, basically as you'll see in our example the test code will read like a specification of the functionality we're trying to test

    In SpecRunner HTML page, replace all the references to the erased src and spec files with the files that you yourself edit into those directories
*/
function detectCookie(items) {
    for(var i = 0; i < items.length; i++) {
        if (items[i].toLowerCase().indexOf("cookie") !== -1) {
            return true;
        }
    }

    return false;
}
