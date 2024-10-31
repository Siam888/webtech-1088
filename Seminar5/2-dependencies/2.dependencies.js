const crypto = require('crypto-js')

const word1 = 'Word1'

const encryptedWord = crypto.AES.encrypt(word1, "secret key").toString()

console.log(encryptedWord);

const decryptedWord = crypto.AES.decrypt(encryptedWord, "secret key").toString(crypto.enc.Utf8)

console.log(decryptedWord);

