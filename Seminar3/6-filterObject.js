//Manipulare array de obiecte

const getFilteredObjects = (laptops, filterObject) =>
    laptops.filter(e => {
        var keys = Object.keys(filterObject);
        for (const key of keys) {
            if (e[key] !== object[key]) {
                return true;
            }
        }
        return false;
    })



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

const result = getFilteredObjects(sampleObjects,
    {
        processor: 'i5',
        ram: 8
    }
)

console.log(result);