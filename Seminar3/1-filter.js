const animalList = [
    'giraffe',
    'cat',
    'elephant',
    'tiger',
    'lion',
    'giraffe', // duplicate
    'giraffe',
    'giraffe', // duplicate
    'zebra',
    'monkey',
    'bear',
    'horse',
    'giraffe', // duplicate
    'shark',
    'penguin',
    'koala',
    'kangaroo',
    'giraffe', // duplicate
    'rabbit',
    'fox'
];

//filter:  primește o funcție callback ca argument, iar aceasta testează fiecare element al array-ului. 
//returnează un nou array, eventual de lungime mai mică, care conține numai elementele care au trecut testul.

const filterFunction = (list, forbiddenWord, minWordLength) => {
    return list.filter(animal => {
        if (animal !== forbiddenWord && animal.length >= minWordLength) {
            return true;
        } else {
            return false;
        }
    })

}

console.log(filterFunction(animalList, 'giraffe', 4))

const filterFunctionSimplified = (list, forbiddenWord, minWordLength) =>
    list.filter(animal => animal !== forbiddenWord && animal.length >= minWordLength)

console.log(filterFunctionSimplified(animalList, 'giraffe', 4))
