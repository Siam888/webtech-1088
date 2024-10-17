
const forbiddenWords = ['este','fenomenal']


const sampleText = `
Javascript
este 
fenomenal
`

const censor = (text, array) => {
    for (const element of array) {
        const censoredWord = element.split('').map((e, idx, arr) => {
            if (idx == 0 || idx == arr.length - 1) {
                return e;
            }
            return '*';
        }
        ).join('')
        text = text.replace(element, censoredWord)
    }

    return text;
}

console.log(censor(sampleText, forbiddenWords));