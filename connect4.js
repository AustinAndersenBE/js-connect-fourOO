class Game {
  constructor(player1, player2, width = 7, height = 6) {
    this.width = width;
    this.height = height;
    this.players = [player1, player2];
    this.currPlayer = player1;
    this.board = [];
    this.isGameOver = false;
    this.makeBoard();
  }

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placePiece(y, x) {
    this.board[y][x] = this.currPlayer;
  }

  switchPlayer() {
    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  checkForWin() {
    const _win = (cells) => {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );
    };

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
    return false;
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }

  toString() {
    return this.color;
  }
}

class GameUI {
  constructor(game) {
    this.game = game;
    this.makeHtmlBoard();
  }

  makeHtmlBoard() {
    const boardElement = document.getElementById('board');
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));

    for (let x = 0; x < this.game.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    boardElement.append(top);

    for (let y = 0; y < this.game.height; y++) {
      const row = document.createElement('tr');
      for (let x = 0; x < this.game.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
      boardElement.append(row);
    }
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.game.currPlayer.color;

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    alert(msg);
    this.game.isGameOver = true;
  }

  handleClick(evt) {
    if (this.game.isGameOver) return;
    const x = +evt.target.id;
    const y = this.game.findSpotForCol(x);
    if (y === null) {
      return;
    }

    this.game.placePiece(y, x);
    this.placeInTable(y, x);

    if (this.game.checkForWin()) {
      return this.endGame(`Player ${this.game.currPlayer} won!`);
    }

    if (this.boardIsFull()) {
      return this.endGame('Tie!');
    }

    this.game.switchPlayer();
  }

  boardIsFull() {
    return this.game.board.every(row => row.every(cell => cell));
  }
}


function startGame() {
  const player1Color = document.getElementById('player1').value || 'red';
  const player2Color = document.getElementById('player2').value || 'blue';
  const player1 = new Player(player1Color);
  const player2 = new Player(player2Color);

  document.getElementById('board').innerHTML = '';
  
  const game = new Game(player1, player2);
  new GameUI(game);
}

document.getElementById('start-game').addEventListener('click', startGame);
