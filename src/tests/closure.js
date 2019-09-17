function foo() {
    // const args = [].slice.call(arguments);
    const arg1 = arguments[0]
    const arg2 = arguments[1]
    return function () {
        return arg1 + arg2;
    }
}

const myFoo = foo(12, 19, 199);
console.log(myFoo());