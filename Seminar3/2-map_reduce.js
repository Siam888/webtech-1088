const sides = [
    10,
    9,
    5,
    12,
    4,
    3
]

// reduce: aplică o funcție asupra fiecărui element dintr-un array pentru a-l reduce la o singură valoare.
// Este utilă pentru a realiza operațiuni cumulative, precum suma, produsul sau concatenarea valorilor.

const getTotalAreas = (array) => {
    return array
        .map(side => Math.pow(side, 2))
        .reduce((prevValue, currentValue) => prevValue + currentValue)
}

//array = [1,2,3]
// const reduce = function(collection, callback, initialValue) {
//     let accumulator = initialValue 
//     for (let i = 0; i < collection.length; i++) {
//         if (i === 0 && initialValue === undefined) {
//             accumulator = collection[0]
//         } else {
//             accumulator = callback(collection[i], accumulator)
//         }
//     }
//     return accumulator
// }

console.log(getTotalAreas(sides))


