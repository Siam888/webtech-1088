
const words = "This is a {0} text and we have {1} it!"

const formatString = (text, ...replacements) => {
    for (let i = 0; i < replacements.length; i++) {
        if (text.indexOf('{' + i + '}') !== -1)
            text = text.replace(`{${i}}`, replacements[i]);
    }

    return text;
}

console.log(formatString(words, 'nice', 'formatted'))