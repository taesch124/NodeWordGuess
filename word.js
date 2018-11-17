const Letter = require('./letter')

function Word(wordString) {
    let wordArr = wordString.split('');
    let letterArr = [];
    wordArr.forEach(e => {
        letterArr.push(new Letter(e));
    });

    this.letters = letterArr;

    this.getWord = function() {
        return this.letters.map((e) => e.getLetter()).join(' ');
    };
    this.getRevealedWord = function() {
        return this.letters.map((e) => e.letter).join('');
    };
    this.checkGuess = function(letter) {
        let found = false;
        for(let i = 0; i < this.letters.length; i++) {
            if(this.letters[i].checkGuess(letter)) {
                found = true;
            }
        }
        return found;
    }
}

module.exports = Word;