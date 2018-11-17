function Letter(letter) {
    this.letter = letter;
    this.guessed = letter.match(/^[A-Za-z]+$/) ? false : true;
    this.getLetter = function() {
        if (this.guessed) {
            return this.letter;
        } else {
            return '_';
        }
    };
    this.checkGuess = function(letter) {
        if(this.letter.toLowerCase() === letter.toLowerCase()) {
            this.guessed = true;
            return true;
        }
        
        return false;
    };
}

module.exports = Letter;