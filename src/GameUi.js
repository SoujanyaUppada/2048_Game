

// GameUI.js
import React from 'react';

export const GameUI = ({ board }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`tile tile-${tile || 'empty'}`}
          >
            {tile !== 0 ? tile : ''}
          </div>
        ))
      )}
    </div>
  );
};
