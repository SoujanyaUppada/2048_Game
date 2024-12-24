export const GameLogic = {
    initializeBoard: () => {
      const board = Array(4).fill().map(() => Array(4).fill(0));
      GameLogic.addRandomTile(board);
      GameLogic.addRandomTile(board);
      return board;
    },
  
    addRandomTile: (board) => {
      const emptyTiles = [];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (board[i][j] === 0) emptyTiles.push([i, j]);
        }
      }
      if (emptyTiles.length > 0) {
        const [x, y] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[x][y] = Math.random() > 0.1 ? 2 : 4;
      }
    },
  
    move: (board, direction) => {
      const rotatedBoard = GameLogic.rotateBoard(board, direction);
      const movedBoard = rotatedBoard.map(GameLogic.compressRow);
      const finalBoard = GameLogic.rotateBoard(movedBoard, direction, true);
      if (!GameLogic.isBoardChanged(board, finalBoard)) return board;
      GameLogic.addRandomTile(finalBoard);
      return finalBoard;
    },
  
    compressRow: (row) => {
      const filteredRow = row.filter((val) => val !== 0);
      const newRow = [];
      for (let i = 0; i < filteredRow.length; i++) {
        if (filteredRow[i] === filteredRow[i + 1]) {
          newRow.push(filteredRow[i] * 2);
          i++;
        } else {
          newRow.push(filteredRow[i]);
        }
      }
      while (newRow.length < 4) {
        newRow.push(0);
      }
      return newRow;
    },
  
    rotateBoard: (board, direction, reverse = false) => {
      const rotateClockwise = (b) => {
        const newBoard = Array.from({ length: 4 }, () => Array(4).fill(0));
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            newBoard[j][3 - i] = b[i][j];
          }
        }
        return newBoard;
      };
    
      const rotateCounterClockwise = (b) => {
        const newBoard = Array.from({ length: 4 }, () => Array(4).fill(0));
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            newBoard[3 - j][i] = b[i][j];
          }
        }
        return newBoard;
      };
    
      let rotated;
      switch (direction) {
        case 'ArrowUp':
          rotated = reverse ? rotateClockwise(board) : rotateCounterClockwise(board);
          break;
        case 'ArrowDown':
          rotated = reverse ? rotateCounterClockwise(board) : rotateClockwise(board);
          break;
        case 'ArrowLeft':
          rotated = reverse ? board.map(row => [...row]) : board;
          break;
        case 'ArrowRight':
          rotated = reverse ? board.map(row => [...row].reverse()) : board.map(row => [...row].reverse());
          break;
        default:
          rotated = board;
      }
      return rotated;
    },
    
  
    rotateClockwise: (board) => {
      const newBoard = Array.from({ length: 4 }, () => Array(4).fill(0));
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          newBoard[j][3 - i] = board[i][j];
        }
      }
      return newBoard;
    },
  
    rotateCounterClockwise: (board) => {
      const newBoard = Array.from({ length: 4 }, () => Array(4).fill(0));
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          newBoard[3 - j][i] = board[i][j];
        }
      }
      return newBoard;
    },
  
    isBoardChanged: (board1, board2) => {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (board1[i][j] !== board2[i][j]) return true;
        }
      }
      return false;
    },
  
    hasWon: (board) => {
      return board.some(row => row.some(tile => tile === 2048));
    },
  
    hasLost: (board) => {
      const noMoves = !board.some(row => row.some(tile => tile === 0));
      if (!noMoves) return false;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (i < 3 && board[i][j] === board[i + 1][j]) return false;
          if (j < 3 && board[i][j] === board[i][j + 1]) return false;
        }
      }
      return true;
    },
  };