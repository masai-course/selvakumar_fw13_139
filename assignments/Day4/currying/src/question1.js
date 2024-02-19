// Problem 1:-currying
function evaluate(operation) {
    if (operation === "mul") {
        return function (a) {
            return function (b) {
                return a * b;
            };
        };
    } else if (operation === "add") {
        return function (a) {
            return function (b) {
                return a + b;
            };
        };
    } else if (operation === "div") {
        return function (a) {
            return function (b) {
                if (b === 0) {
                    return "Division by zero is not allowed";
                }
                return a / b;
            };
        };
    } else if (operation === "sub") {
        return function (a) {
            return function (b) {
                return a - b;
            };
        };
    } else {
        return "Invalid Operation";
    }
}


// let mul = evaluate("mul");
// console.log(mul(3)(4)); // 12

// Problem 2: Infinite Currying

function multiply(a) {
    let current = a;

    function multiplyNext(b) {
        if (b === undefined) {
            return current;
        } else if (b === 0) {
            return 0;
        } else {
            current *= b;
            return multiplyNext;
        }
    }

    return multiplyNext;
}

// const result1 = multiply(2)(3)(4)(5)();
// console.log(result1); // 120

//Problem 3: Currying

function sumOfTwoNumbers(a) {
    return function(b) {
        return a + b;
    };
}

// const result3 = sumOfTwoNumbers(2)(3);
// console.log(result3); // 5

//Problem 4: Flattening an Array

function flattenArray(arr) {
    return arr.reduce((acc, val) => {
        return Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val);
    }, []);
}

// const input = [1, [2, [3, 4], [5,11,13,500]], 6];
// const result4 = flattenArray(input);
// console.log(result4);  [1, 2, 3, 4, 5, 11, 13, 500, 6 ]

// Don't remove the below export and also don't re-name any functons.

export { evaluate, multiply, sumOfTwoNumbers, flattenArray };
