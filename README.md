# Tic Tac Toe Application
### By Anthony Guariglia

## Overview

This application creates a playable and responsive version of the common doodle-game of Tic Tac Toe. The game allows a user to play against himself or a friend and visually select the square on which we would like to make his move, while subsequently seeing the UI update with the symbol and space of his choice. 

### Planning

#### User Stores

The user should be able to perform the following operations:

Sign up and create an account
Sign into said account
Sign out of said account
Select between playing as 'X' or 'O'
See the screen update with each move made
Be notified when they have won/lost/tied
Be able to play again once the game is over
See a clean, bug-free UI that is responsive to in-game changes

#### WireFrames of App UI

![Home Screen](/public/HOME-SCREEN.jpg)
![Select Symbol](/public/SELECT-SYMBOL.jpg)
![1st Turn](/public/1ST-TURN.jpg)
![Play Again](/public/PLAY-AGAIN.jpg)

### Game Flow

Before starting, the game requires the user to sign into an account. If the user does not have one, they have the option to create an account with their email and a password of their choice.

Once an account is created, they can navigate back to the sign-in page to sign into their account.

Upon successful sign-in, a button will appear that allows them to start a new game.

Selecting 'NEW GAME' will prompt them to select their opponent, either player or computer as displayed by the two icons.

If the player is selected, they will be prompted to select a symbol, choosing between X and O. 

If the computer is selected, they will have the option to choose between an easy and a hard difficulty, as represented by the smiling and frowning face, respectively. Once selected, they will be directed to the same symbol selection screen to choose between X and O.

Once a piece is selected, the game board will appear and the user will be able to select their desired square. Selection of the square will populate that space with their symbol.

After the user (Player 1) makes their selection, the app then prompts Player 2 to make their move, with the opposite of the symbol selected by Player 1. The game text will update to show which player's turn it currently is.

The players will continue this sequence until either a winner is determined or all squares are filled. In the case of a winner, the winner's symbols that led to their victory will turn green. In the case of a tie, all squares turn grey.

Upon completion of the game, a button will appear at the bottom of the screen to 'PLAY AGAIN'. Selecting this will bring the user back to the symbol-selection screen, and allow them to reselect any symbol they choose. The game will continue after that point.

Once finished, the user may click on the icon at the top-right corner of the screen that displays their email and select 'sign out'. They will receive a message validating the success of that operation and may sign back in at any point after.

### Link to Deployed Project

https://anthonyguariglia.github.io/game-project
