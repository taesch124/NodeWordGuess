const WordList = require('./word-list');
const Inquirer = require('inquirer');

// const introText = `===========================================================
//         |\     /|\__   __/(  __  \ (  ____ \(  ___  )\
//         | )   ( |   ) (   | (  \  )| (    \/| (   ) |
//         | |   | |   | |   | |   ) || (__    | |   | |
//         ( (   ) )   | |   | |   | ||  __)   | |   | |
//         \ \_/ /    | |   | |   ) || (      | |   | |
//         \   /  ___) (___| (__/  )| (____/\| (___) |
//         \_/   \_______/(______/ (_______/(_______)
                                                    
//             _______  _______  _______  _______ 
//             (  ____ \(  ___  )(       )(  ____ \
//             | (    \/| (   ) || () () || (    \/
//             | |      | (___) || || || || (__    
//             | | ____ |  ___  || |(_)| ||  __)   
//             | | \_  )| (   ) || |   | || (      
//             | (___) || )   ( || )   ( || (____/\
//             (_______)|/     \||/     \|(_______/
                                    
//           _______  _        _______  _______  _______  _       
// |\     /|(  ___  )( (    /|(  ____ \(       )(  ___  )( (    /|
// | )   ( || (   ) ||  \  ( || (    \/| () () || (   ) ||  \  ( |
// | (___) || (___) ||   \ | || |      | || || || (___) ||   \ | |
// |  ___  ||  ___  || (\ \) || | ____ | |(_)| ||  ___  || (\ \) |
// | (   ) || (   ) || | \   || | \_  )| |   | || (   ) || | \   |
// | )   ( || )   ( || )  \  || (___) || )   ( || )   ( || )  \  |
// |/     \||/     \||/    )_)(_______)|/     \||/     \||/    )_)
// =====================================================================`

let currentWord;
let guessesRemaining;
let incorrectGuesses;

//console.log(introText);
startGame();

function startGame() {
    guessesRemaining = 10;
    incorrectGuesses = [];
    currentWord = WordList.getRandomWord();
    console.log(currentWord.getWord());
    guessLetter();
}

function playAgain() {
    Inquirer.prompt([
        {
            type: 'confirm',
            message: 'Play again?',
            name: 'playAgain'
        }
    ])
    .then(answers => {
        if(answers.playAgain) {
            startGame();
        } else {
            return;
        }
    });
}

function guessLetter() {
    Inquirer.prompt([
        {
            type: 'input',
            message: 'Guess a letter! (! to quit)',
            name: 'guessedLetter',
            validate: (input) => {
                if(input.match(/^[A-Za-z!]+$/) && input.length === 1) {
                    return true;
                } else {
                    return 'Please enter a letter.';
                }
            }
        }
    ])
    .then(checkGuess);
}

function checkGuess(answers) {
    if (answers.guessedLetter === '!'){
        return;
    } else if (currentWord.checkGuess(answers.guessedLetter)) {
        console.log('Correct!');
    } else if (incorrectGuesses.includes(answers.guessedLetter)) {
        console.log('You already tried that...');
    } else {
        incorrectGuesses.push(answers.guessedLetter);
        guessesRemaining--;
        console.log('Wrong!');
        console.log(guessesRemaining + ' guesses remaining.');
    }
    console.log(currentWord.getWord());

    if(!currentWord.getWord().includes('_')) {
        console.log('You win! ');
        playAgain();
    } else if(currentWord.getWord().includes('_') && guessesRemaining <= 0) {
        console.log('You Lose!');
        playAgain();
    } else {
        guessLetter();
    }
}

