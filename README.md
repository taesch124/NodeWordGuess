# NodeWordGuess

Node Word Guess is a CLI application that allows users to play a game similar to hangman on the command line. The theme is video games, so all of the possible word options are of popular video games titles/franchises. Upon starting the application, it will immediately prompt the user to begin guessing letters for a randomly selected game. The user is allowed 10 incorrect guesses before losing for that word. Once the game is completed, they will be asked if they want to play again before continuing to the next word.

When a letter is guessed correctly, the user gets a prompt letting them know and revealing that letter in the current word. If the letter is guessed incorrectly, the remaining guesses is decremented and the user is shown a prompt that the letter chosen is not in the current word. If the letter has been guessed before (either correctly or incorrectly), they are told so, but no more is done and the user can guess again. Once the word is fully revealed, or the user has exhausted all of their possible guesses and they are prompted whether they won or lost. The application will then ask if the user would like to play again. If yes, it will select a new word randomly and the game starts over.

## Starting Game

![Image of game starting](https://github.com/taesch124/NodeWordGuess/blob/master/assets/images/application-flow/start-game.PNG)

## Winning Game

![Image of winning game](https://github.com/taesch124/NodeWordGuess/blob/master/assets/images/application-flow/win-game.PNG)

## Losing Game

![Image of losing game](https://github.com/taesch124/NodeWordGuess/blob/master/assets/images/application-flow/lose-game.PNG)

## Repeating Guess

![Image of repeating a guess](https://github.com/taesch124/NodeWordGuess/blob/master/assets/images/application-flow/repeat-guess.PNG)

## Quitting Game

![Image of quitting game](https://github.com/taesch124/NodeWordGuess/blob/master/assets/images/application-flow/quit-game.PNG)