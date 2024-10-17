const text = 'Un {substantiv} este {adjectiv}'

const formatString = (text, namedReplacements) => {
    let modified = text;
    for (const key in namedReplacements) {
        if (text.indexOf('{' + key + '}') !== -1) {
            modified = modified.replace('{' + key + '}', namedReplacements[key])
        }
    }
    return modified;
}

console.log(formatString(text, { substantiv: 'catel', adjectiv: 'periculos' }))
