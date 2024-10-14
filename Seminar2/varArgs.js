// Funcția addToArray folosește operatorul rest '...args'
// pentru a colecta toate argumentele într-un array
function addToArray(...args) {
    // Inițializăm un array gol
    let array = [];

    // Parcurgem argumentele primite și le adăugăm în array
    for (let i = 0; i < args.length; i++) {
        array.push(args[i]);  // Adăugăm fiecare argument în array
    }

    // Returnăm array-ul completat cu toate argumentele
    return array;
}

// Exemplu de utilizare a funcției addToArray:
// console.log(addToArray(1, 2, 3, 4, 5, 6));  // Output: [1, 2, 3, 4, 5, 6]

// Funcția sum primește trei parametri și returnează suma acestora
function sum(x, y, z) {
    return x + y + z;
}

// Inițializăm un array cu mai multe valori
const array = [1, 2, 3, 7];

// Folosim operatorul spread '...' pentru a descompune array-ul
// și a trimite elementele sale ca argumente individuale funcției sum
console.log(sum(...array));  // Output: 6 (sum(1, 2, 3) adună primele trei elemente)


// Funcția addWithArguments folosește obiectul 'arguments', care conține toate argumentele primite de funcție
function addWithArguments() {
    let sum = 0;

    // 'arguments' este similar cu un array, dar nu este un obiect.
    // Îl putem parcurge folosind un for loop pentru a aduna toate valorile
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];  // Adăugăm fiecare argument la sumă
    }

    return sum;  
}

// Exemplu de utilizare a funcției cu mai multe argumente
console.log(addWithArguments(1, 2, 3, 4));  // Output: 10
console.log(addWithArguments(10, 20));      // Output: 30
