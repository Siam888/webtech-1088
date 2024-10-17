
const sampleArray = [2, 4, 6, 8, 10, 13]


const avgWithReduce = (array) => {

    return array.reduce((prev, curr) => {
        return prev + curr;
    }) / array.length
}

console.log(avgWithReduce(sampleArray))