// Functie care sa intercaleze valorile a doua array-uri in alt array
// while(condition){

// }


function intercalare(array1, array2) {
    let combinedArray = [];
    
    // Continuăm cât timp unul dintre array-uri are elemente
    while (array1.length > 0 || array2.length > 0) {
        
        // Luăm și adăugăm elementul din array1, dacă există
        if (array1.length > 0) {
            combinedArray.push(array1.shift());
        }
        
        // Luăm și adăugăm elementul din array2, dacă există
        if (array2.length > 0) {
            combinedArray.push(array2.shift());
        }
    }

    return combinedArray;
}



console.log(intercalare([1, 2, 3], [4, 5, 6, 7]))