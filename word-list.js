const Word = require('./word');
let wordList = [];

const possibleGames = ["The Legend of Zelda", "Halo", "Prince of Persia", "Super Mario", "Fallout", "Bioshock", "God of War", "Shadow of the Colossus", "Final Fantasy", "Grand Theft Auto", "Metroid", "Mortal Kombat", "Mass Effect", "Diablo", "Resident Evil", "Tomb Raider", "Assassin's Creed", "Far Cry", "Warcraft"];

for (let i = 0; i < possibleGames.length; i++) {
    wordList.push(new Word(possibleGames[i]));
}


let getRandomWord = function() {
    let random = Math.floor(Math.random() * wordList.length);
    let randomWord = new Word(wordList[random].getRevealedWord());
    return randomWord;
}

module.exports.getRandomWord = getRandomWord;