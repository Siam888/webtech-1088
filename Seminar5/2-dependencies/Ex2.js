// După ce ați testat exemplul scrieți o aplicație simplă care creează un director,
// un fișier în director și apoi șterge directorul (puteți utiliza rimraf).

const fs = require('fs')
const rimraf = require('rimraf')

// Creeaza un director in mod asicron
fs.mkdir('myFolder', { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Folder created!');
});

// creeaza un fisier in mod asincron
fs.writeFile('myFolder/myFile.txt', 'Hello, world!', (err) => {
    if (err) throw err;
    console.log('File created and content written!');
});

rimraf.rimraf('myFolder')
    .then(msg => console.log('Folder deleted'))
    .catch(err => console.error(err))

