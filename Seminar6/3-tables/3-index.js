let evenCollection = document.querySelectorAll('tbody tr:nth-child(even)');
let oddCollection = document.querySelectorAll('tbody tr:nth-child(odd)');



if (evenCollection && evenCollection.length > 0) {

    evenCollection.forEach(element => {
        element.bgColor = "red";
    });
}

if (oddCollection && oddCollection.length > 0) {
    oddCollection.forEach(elem => {
        elem.bgColor = "yellow"
    })
}