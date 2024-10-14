// Funcția fibonacciAtN calculează elementul n din seria Fibonacci
function fibonacciAtN(n) {
    // Dacă n este 0 sau 1, returnăm 1, conform regulii de bază a seriei Fibonacci
    switch (n) {
        case 0:
        case 1:
            return 1;
        default:
            // Calculăm elementul curent ca suma celor două elemente anterioare
            return fibonacciAtN(n - 1) + fibonacciAtN(n - 2);
    }
}

// Verificăm dacă există un argument introdus de la linia de comandă
if (process.argv.length >= 3) {
    // Convertim al treilea argument din linia de comandă într-un număr întreg
    let order = parseInt(process.argv[2]);
    // Afișăm elementul Fibonacci calculat pentru acest număr
    console.log(fibonacciAtN(order));
}
