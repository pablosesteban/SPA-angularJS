/*
IIFE (Immediately-Invoked Function Expression)
     Is a design-pattern which produces a lexical scope using JavaScript's function scoping
     
     Can be used to avoid variable hoisting from within blocks, protect against polluting the global environment and simultaneously allow public access to methods while retaining privacy for variables defined within the function
     
     A common convention is to enclose the function expression in parentheses to explicitly tell the parser to expect an expression, since in JavaScript parentheses can't contain statements. Otherwise, in most situations, when the parser encounters the function keyword, it treats it as a function declaration (statement), and not as a function expression
     
     The first pair of parentheses turns the code within into an expression, and the second pair of parentheses calls the function that results from that evaluated expression
     
     All the variables used inside the IIFE (like in any other normal function) are not visible outside its scope
*/
(function() {
    //We're enabling certain things to just protect us from making mistakes, i.e. creating global variables,...
    use 'strict';
    
    /*
    MVVM (Model-View-ViewModel)
         Facilitates a separation of development of the graphical user interface (HTML) from development of the business logic or back-end logic (the data model)

         The ViewModel of MVVM is a value converter, meaning the ViewModel is responsible for exposing (converting) the data objects from the model in such a way that objects are easily managed and presented. It is more Model than View, and handles most if not all of the view's display logic

         View: HTML
         ViewModel: angular controllers
         Model:
    */
    /*
    angular variable: is the only global variable exposed by AngularJS
    
    module method:
        is responsible for creating modules
        first argument is the module name and second one is the dependencies with other modules
        return the module instance
    */
    angular.module("myFirstApp", [])
        /*
        ViewModel (controller)
            another construct of Angular that will be responsible for a smaller portion of our page (HTML)
            is really the way we define the ViewModel of our View

        controller method:
            it takes the name of our ViewModel (the name of our controller) and a function that defines its functionality
        */
        .controller("MyFirstController", function() {
            
        });
})();
