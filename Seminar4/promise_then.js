


const getObjectFromUrl = (url) =>
    new Promise((resolve) => fetch(url)
        .then(resp => resp.json())
        .then(resp => resolve(resp)))

const countryBoundaries = (country) =>
    new Promise(resolve =>
        getObjectFromUrl(`https://nominatim.openstreetmap.org/search?country=${country}&format=json`)
            .then(object => resolve({
                minLatitude: object[0].boundingbox[0],
                maxLatitude: object[0].boundingbox[1],
                minLongitude: object[0].boundingbox[2],
                maxLongitude: object[0].boundingbox[3]
            })))
        .then(boundaries => console.log(boundaries))

function main() {
    countryBoundaries("Romania")
}

main()
