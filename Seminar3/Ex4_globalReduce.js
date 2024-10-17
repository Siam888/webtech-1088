
const sampleArray = [1, 2, 3, 4, 5]

const reduce = (collection, callback, initialValue) => {
    let acc = initialValue

    for (var elem of collection) {
        if (!acc) {
            acc = elem
        } else {
            acc = callback(acc, elem)
        }
    }

    return acc;
}


console.log(reduce(sampleArray, (x, y) => x + y,1))