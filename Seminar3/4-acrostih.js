const sampleArray = ['the', 'quick', 'brown','yellow', 'fox']

const sampleText = `
best
read
on
windy
nights
`

const checkAcrostih = (array, text) => {
    const word = text.split('\n')
    .filter(e => e)
    .map(e => e.trim())
    .map(e => e.charAt(0))
    .join('');
    return array.indexOf(word) !== -1;
}

console.log(checkAcrostih(sampleArray, sampleText))
