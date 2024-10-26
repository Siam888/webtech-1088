
async function getObjectFromUrl(url) {
    let result = await fetch(url);
    let json = await result.json();
    return json;
}

async function getCountryBoundaries(country) {

    let object = await getObjectFromUrl(`https://nominatim.openstreetmap.org/search?country=${country}&format=json`)
    return {
        minLatitude: object[0].boundingbox[0],
        maxLatitude: object[0].boundingbox[1],
        minLongitude: object[0].boundingbox[2],
        maxLongitude: object[0].boundingbox[3]
    }

}

async function main() {
    let boundaries = await getCountryBoundaries("Romania");
    console.log(boundaries);
}

main()