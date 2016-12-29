/*
Prototypal Inheritance:
    Javascript does not have class inheritance like Java, it has Prototypal Inheritance which is based on object instances

    The original object instance becomes the prototype for all subsequently created objects

    All objects in Javascript has one special property called "__proto__" and it's a special property you shouldn't be accessing directly for performance reasons

    This special property is where the JavaScript engine, in its kind of behind the scenes holds a reference to the parent prototype of the child object
*/

var parent = {
    value: "parentValue",
    obj: {
        objValue: "parentObjValue"
    },
    walk: function () {
        console.log("walking!");
    }
};

/*
Object.create(parentObj):
    To create objects based on other objects

    The parentObj is going to be the prototype of the created object

    The created object will have prototypal inheritance from the parentObj

    This function is something that should be supported by all the modern browsers
*/
var child = Object.create(parent);

/*
As the child object does not delcare any properties, those properties really comes from the parent object and what's going to happen is that JavaScript engine will go ahead and go up the prototype chain and look up those properties inside the prototype of the child object, which is the parent
*/
console.log("CHILD - child.value: ", child.value);
console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
console.log("PARENT - parent.value: ", parent.value);
console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
console.log("parent: ", parent);
console.log("child: ", child);

/*
Change the value to childObjValue as it is a primitive type (not an object)

When we reference it later in the console.log, the JavaScript engine will not access the parent's value property

It will access the child's value property because the child's value property Is masking the parent value property
*/
child.value = "childValue";
/*
Since this "obj" property is still not a property of the child object, but it's still requiring the JavaScript engine to walk up the prototype chain in order to look it up, this "obj" value will actually get changed and changed to the string child "objValue" on the parent object itself
*/
child.obj.objValue = "childObjValue";
console.log("*** CHANGED: child.value = 'childValue'");
console.log("*** CHANGED: child.obj.objValue = 'childObjValue'");
console.log("CHILD - child.value: ", child.value);
console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
console.log("PARENT - parent.value: ", parent.value);
console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
console.log("parent: ", parent);
console.log("child: ", child);

/*
They are pointing to the same exact instance!!
*/
console.log("child.obj === parent.obj ? ", child.obj === parent.obj);

var grandChild = Object.create(child);
console.log("Grandchild: ", grandChild);
/*
Coming from the parent, not the child object!!
*/
grandChild.walk();

/*
Function Constructors:
    You can create new objects and treat them sort of like classes using functions and you can use the functions as a constructor for that object

    So the invocation of the function is not the regular invocation, you actually need to put the keyword new in front of it

    "this" keyword inside of the function constructor will point to the function constructor object or the object itself

    When the functions start with a capital letter, that's just a little reminder that this is not a regular function to be used as any other function, but is actually a function constructor
*/
function Dog(name) {
    this.name = name;

    console.log("'this' is: ", this);
}

var myDog = new Dog("Max");
console.log("myDog: ", myDog);

/*
Without the keyword "new", the function is NOT being used as a function constructor

"this" keyword inside of the function constructor will no longer point to the function constructor object or the dog object in this case

It will point to the outer scope, and in this case the outer scope is the global scope and the global scope in a browser is nothing more than the WINDOW object
*/
Dog("Max2");
