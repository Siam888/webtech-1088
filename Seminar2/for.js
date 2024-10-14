
function diffChar(str1, str2) {
    if (str1.length != str2.length) {
        return -1;
    }

    let diff = 0;

    for (let i = 0; i < str1.length; i++) {
        if(str1[i] !== str2[i]){
            diff++;
        }
    }

    return diff;
}


console.log(diffChar('abc', 'abcd'))
console.log(diffChar('abc','abc'))
console.log(diffChar('abc','adg'))