// 1. Funcție clasică definită cu cuvântul cheie 'function'
function sayHello(name) {
    // Afișează în consolă un mesaj care include numele dat ca parametru
    console.log(`Hello ${name}`);
}

// Apelăm funcția cu argumentul "World"
sayHello("World");  // Output: Hello World


// 2. Funcție anonimă stocată într-o variabilă (funcție expresie)
const greet = function(name) {
    // Afișează în consolă un mesaj care include numele dat ca parametru
    console.log(`Goodday ${name}`);
}

// Apelăm funcția cu argumentul 'Mister'
greet('Mister');  // Output: Goodday Mister


// 3. Funcție definită folosind sintaxa 'arrow function'
const greetArrow = (name) => {
    // Afișează în consolă numele dat ca parametru
    console.log(name);
}

// Apelăm funcția cu argumentul 'Hello Sir'
greetArrow('Hello Sir');  // Output: Hello Sir