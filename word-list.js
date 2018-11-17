const Word = require('./word');
let wordList = [];

wordList.push(new Word('tomato'));
wordList.push(new Word('hello world'));


let getRandomWord = function() {
    let random = Math.floor(Math.random() * wordList.length);
    let randomWord = new Word(wordList[random].getRevealedWord());
    return randomWord;
}

module.exports.getRandomWord = getRandomWord;