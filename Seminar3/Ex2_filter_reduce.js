
const numbers =
    [
        12,
        4,
        3,
        9,
        5,
        11,
        23,
        21
    ]


const getSumForDivisibleNo = (array, divisor) => {
    return array
        .filter(number => !(number % divisor))
        .reduce((prev, current) =>
            prev + current
        )
}

console.log(getSumForDivisibleNo(numbers, 3));