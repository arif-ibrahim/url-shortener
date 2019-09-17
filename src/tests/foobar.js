function mult(a, b) {
    return a*b;
}

function sum(a, b) {
    return a+b;
}

function composition(fn1, fn2) {
    return function () {
        let args = [].slice.call(arguments);
        return fn2(fn1(args.shift(), args.shift()), args.shift());
    }
}

let cmp = composition(sum, mult);

let data = cmp(3, 4, 8);
console.log(data);







