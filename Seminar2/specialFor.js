// Definim un obiect cu proprietățile 'name' și 'price'
const obj = {
    name: 'Hello',
    price: '100'
}

// Iterăm prin toate cheile obiectului folosind 'for...in'
for (const key in obj) {
    // Afișăm fiecare cheie (name, price)
    console.log(key);
}

// Definim un array cu trei elemente
const array = [1, 2, 3]

// Iterăm prin elementele array-ului folosind 'for...of'
for (const iterator of array) {
    // Afișăm fiecare element (1, 2, 3)
    console.log(iterator);
}
