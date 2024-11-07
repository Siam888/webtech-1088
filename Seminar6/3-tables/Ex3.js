let oddCollection = document.querySelectorAll('tbody tr:nth-child(odd)');

let firstRow = document.querySelector('tbody tr:first-child')
let lastRow = document.querySelector('tbody tr:last-child')


if (oddCollection && oddCollection.length > 0) {
    oddCollection.forEach(elem => {
        elem.bgColor = "fuchsia"
    })
}

if (firstRow)
    firstRow.bgColor = 'lightblue'

if (lastRow)
    lastRow.bgColor = 'green'