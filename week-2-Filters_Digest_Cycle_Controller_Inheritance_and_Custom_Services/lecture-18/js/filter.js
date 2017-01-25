var shoppingList = ["Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"];

console.log(shoppingList);

/*
JAVASCRIPT FILTERS:
    The Array.prototype.filter(callback[, thisArg]) method:
        Creates a new array with all elements that pass the test implemented by the provided function

        Function is a predicate, to test each element of the array. Return true to keep the element, false otherwise, taking three arguments: element, index and the array
*/
var searchedValue = "Bismol";

console.log(shoppingList.filter(function(element, index, arr) {
    console.log("element: " + element + ", index: " + index + ", array: " + arr);

    return element.indexOf(searchedValue) != -1;
}));
