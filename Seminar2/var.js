// VARIABILE

// 1. var
// 'var' are un comportament de *hoisting*, ceea ce înseamnă că declarația variabilei este mutată la începutul scopului ei.
// Cu toate acestea, valoarea nu este atribuită până la linia unde este efectiv definită.
// Exemplu:
console.log(x);  // Output: undefined (deoarece doar declarația este ridicată, nu și valoarea)
var x = 5;  // Definim și atribuim valoarea lui x

// 'var' are scop global sau de funcție și poate fi redeclarată.
var x = 10;  // Redeclarația este permisă
console.log(x);  // Output: 10


// 2. let
// 'let' este introdus în ES6 și are scop bloc (block scope), adică variabila există doar în interiorul blocului de cod (definit de {}).
// Nu are hoisting la fel ca 'var', deci trebuie definită înainte de utilizare.
{
    let x = 5;
    console.log(x);  // Output: 5 (x este accesibil doar în acest bloc)
}
console.log(x);  // Error: x is not defined (în afara blocului x nu există)

// 'let' nu permite redeclararea unei variabile în același scop.
let a = 10;
// let a = 20;  // Error: cannot redeclare block-scoped variable


// 3. const
// 'const' este folosit pentru a defini variabile care nu se vor schimba (constante). Odată atribuită, valoarea nu poate fi schimbată.
const z = 5;
// z = 6;  // Error: Assignment to constant variable (nu poți reasigna)

// La fel ca 'let', 'const' are scop bloc și nu poate fi redeclarată sau redefinită.
{
    const y = 6;
    console.log(y);  // Output: 6 (valabil doar în acest bloc)
}
// console.log(y);  // Error: y is not defined (în afara blocului y nu există)

// Important: Obiectele și array-urile declarate cu 'const' nu pot fi reasignate, dar proprietățile sau elementele lor pot fi modificate.
const obj = { name: "John" };
obj.name = "Doe";  // Atribuirea de noi valori pentru proprietăți este permisă
console.log(obj);  // Output: { name: "Doe" }

const arr = [1, 2, 3];
arr.push(4);  // Este permisă modificarea conținutului array-ului
console.log(arr);  // Output: [1, 2, 3, 4]
