/*
IIFE (Immediately-Invoked Function Expression)
     Is a design-pattern which produces a lexical scope using JavaScript's function scoping
     
     Can be used to avoid variable hoisting from within blocks, protect against polluting the global environment and simultaneously allow public access to methods while retaining privacy for variables defined within the function
     
     A common convention is to enclose the function expression in parentheses to explicitly tell the parser to expect an expression, since in JavaScript parentheses can't contain statements. Otherwise, in most situations, when the parser encounters the function keyword, it treats it as a function declaration (statement), and not as a function expression
     
     The first pair of parentheses turns the code within into an expression, and the second pair of parentheses calls the function that results from that evaluated expression
     
     All the variables used inside the IIFE (like in any other normal function) are not visible outside its scope
*/
(function() {
    use 'strict';
    
    /*
    angular variable: is the only global variable exposed by AngularJS
    
    module method:
        is responsible for creating modules
        first argument is the module name and second one is the dependencies with other modules
        return the module instance
    */
    angular.module("myFirstApp", [])
    
        .controller("MyFirstController", function() {
            
        });
})();