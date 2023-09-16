# js-connect-fourOO
This is a project where I refactored a connect four game

## Overview
This project is a simple implementation of the classic Connect 4 game, separating game logic and user interface concerns for better readability and maintainability.

## Features

### Game Class
- **Constructor**: Sets the default values for the game board dimensions, players, and other game state variables.
- **Instance Variables**: Defined instance variables for `width`, `height`, `players`, `currPlayer`, `board`, and `isGameOver`.

### Player Class
- **Constructor**: Takes a string representing the color (e.g., "orange" or "#ff3366") and stores it on the player instance.

### Game Logic
- The `Game` class keeps track of the current player object using `this.currPlayer = player1;`.

### User Interface (GameUI Class)
- Responsible for handling the DOM and user interactions.
- The `placeInTable` method sets the color of the pieces dynamically based on `currPlayer.color` with `piece.style.backgroundColor = this.game.currPlayer.color;`.

## How to Run
- Open `index.html` in your web browser.
