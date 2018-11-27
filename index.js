const WordList = require('./word-list');
const Inquirer = require('inquirer');
const Colors = require('colors');

 const introText = 'Welcome to Video Game Guess, see if you know the game/franchise below.';

let currentWord;
let guessesRemaining;
let guessedLetters;

console.log(introText);
startGame();

function startGame() {
    guessesRemaining = 10;
    guessedLetters = [];
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
        console.log('YOU WIN!!'.green);
        playAgain();
    } else if(currentWord.getWord().includes('_') && guessesRemaining <= 0) {
        console.log('YOU LOSE!!'.red);
        playAgain();
    } else {
        guessLetter();
    }
}

