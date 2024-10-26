String.prototype.capitalizeWords = function(){
    return this.replace(/\b[a-z]/g, match => match.toUpperCase())
}

console.log('these words will be capitalized'.capitalizeWords());
