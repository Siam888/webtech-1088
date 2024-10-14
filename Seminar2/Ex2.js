//Aparitie caracter in text

function count(str, chr){
    var count=0;
    for(let i=0;i<str.length;i++){
        if(str[i]==chr){
            count++;
        }
    }
    return count;
}

console.log(count('abcd','a'));