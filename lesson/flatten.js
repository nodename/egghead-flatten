const array = [1, [2, 3], [[4, [5, [6], 7], [8, 9]]]];

const concat = (xs, x) => xs.concat(x);
const isArray = Array.isArray;

/*
const flatten = xs => {
    let result = [];
    for (const x of xs) {
        result = concat(result, isArray(x) ? flatten(x) : x);
    }
    return result;
}
*/

const flatten1element = x => isArray(x) ? flatten(x) : x;

/*
const flatten = xs => {
    let result = [];
    for (const x of xs) {
        result = concat(result, flatten1element(x));
    }
    return result;
}
*/

// const map = (f, xs) => xs.map(f);
const map = f => xs => xs.map(f);
// const reduce = (f, acc, xs) => xs.reduce(f, acc);
const reduce = (f, acc) => xs => xs.reduce(f, acc);

//const flattenEachElement = xs => map(flatten1element) (xs);
//const flatten1level = xs => reduce(concat, []) (xs);
const flattenEachElement = map(flatten1element);
const flatten1level = reduce(concat, []);

/*
const flatten = xs => {
    const flat1 = flattenEachElement(xs);
    return flatten1level(flat1);
}
*/

// const flatten = xs => flatten1level(flattenEachElement(xs));

const compose = (f, g) => x => f(g(x));

// const flatten = compose(flatten1level, flattenEachElement);

const pipe = (f, g) => x => g(f(x));

const flatten = pipe(flattenEachElement, flatten1level);

console.log(flatten(array));
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
