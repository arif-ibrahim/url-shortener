function mult(...args) {
    if (args.length <=2){
        return args[0] * args[1];
    }
    return (args[0] * mult(...args.slice(1)))
}

let arr = [];
for (i=1; i<60; i++){
    arr.push(i);
}

console.log(mult(...arr));

