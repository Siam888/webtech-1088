
const sortByArrayByProperties = (array, sortBy) => {

    return array.sort((a, b) => {
        if (typeof (a[sortBy]) === 'number' && typeof (b[sortBy]) === 'number')
            return a[sortBy] - b[sortBy]
        if (a[sortBy] > b[sortBy]) {
            return 1
        } else if (a[sortBy] === b[sortBy]) {
            return 0;
        } else {
            return -1;
        }
    })
}

const sampleObjects = [
    {
        brand: 'HP',
        processor: 'i5',
        ram: 8
    },
    {
        brand: 'Lenovo',
        processor: 'i5',
        ram: 16
    },
    {
        brand: 'Acer',
        processor: 'i5',
        ram: 8
    },
    {
        brand: 'Asus',
        processor: 'i7',
        ram: 8
    }
]

console.log(sortByArrayByProperties(sampleObjects, 'ram'))


