//Constructor Function
function Person() {
    this.name = "Pablo";
    this.fav = "surf";

    this.describe = function() {
        console.log("'this' keyword: ", this);

        console.log(this.name + " likes " + this.fav);
    }
}

//Using "new" keyword to construct the object, "this" references to it
var pablo = new Person();
pablo.describe();

/*
Without parentheses, "describe" is a Function Value

We are creating a variable and stick it to the function value

So we can actually execute it just by putting parenths behind it

But this time, the "this" keyword is NOT pointing to the object Person but to the "Window" object, this happens because we took that method out of its context and its context became the window

If you take the method out of his context, the "this" very well is pointing to whatever the surrounding context is
*/
var describe = pablo.describe;
describe();

/*
You could actually give it the context and basically it will get that "this" variable assigned to whatever object that you're passing it in the call() method
*/
describe.call(pablo);
