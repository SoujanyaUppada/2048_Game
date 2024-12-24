import React, { useState, useEffect } from 'react';
import './style.css';
import { GameUI } from './GameUi';
import { GameLogic } from './GameLogic';

export default function App() {
  const [board, setBoard] = useState(GameLogic.initializeBoard());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const newBoard = GameLogic.move(board, e.key);
        if (GameLogic.isBoardChanged(board, newBoard)) {
          setBoard(newBoard);
          if (GameLogic.hasWon(newBoard)) {
            setGameWon(true);
          } else if (GameLogic.hasLost(newBoard)) {
            setGameOver(true);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board]);

  return (
    <div className="game-container">
      <h1>2048 Game</h1>
      {gameOver && <div className="overlay">Game Over</div>}
      {gameWon && <div className="overlay">You Win!</div>}
      <GameUI board={board} />
    </div>
  );
}