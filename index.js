const WordList = require('./word-list');
const Inquirer = require('inquirer');
const Colors = require('colors');

// const introText = 
// `===========================================================
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
let guessedLetters;

// console.log(introText);
startGame();

function startGame() {
    guessesRemaining = 10;
    guessedLetters = [];
    currentWord = WordList.getRandomWord();
    console.log(currentWord.getWord());
    guessLetter();
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

function newGamePrompt() {
    Inquirer.prompt([
        {
            type: 'confirm',
            message: 'Do you want to play again?',
            name: 'playAgain'
        }
    ])
    .then(answers => {
        if (answers.playAgain) {
            startGame();
        }
    })
}

function checkGuess(answers) {
    if (answers.guessedLetter === '!'){
        return;
    } else if (guessedLetters.includes(answers.guessedLetter)) {
        console.log('You already tried that...');
    } else if (currentWord.checkGuess(answers.guessedLetter.toLowerCase())) {
        console.log('Correct!'.green);
        guessedLetters.push(answers.guessedLetter.toLowerCase());
    } else {
        guessedLetters.push(answers.guessedLetter.toLowerCase());
        guessesRemaining--;
        console.log('Wrong!'.red);
        console.log(guessesRemaining + ' guesses remaining.');
    }
    console.log(currentWord.getWord());

    if(!currentWord.getWord().includes('_')) {
        console.log('You win!'.green);
        newGamePrompt();
    } else if(currentWord.getWord().includes('_') && guessesRemaining <= 0) {
        console.log('You Lose!'.red);
        newGamePrompt();
    } else {
        guessLetter();
    }
}

