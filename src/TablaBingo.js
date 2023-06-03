import React from 'react';

const TablaBingo = ({ bingoNumbers, handleInputChange, getCellClass }) => {
  return (
    <div className="bingo-board">
      {/* Renderizar las celdas del tablero */}
      {bingoNumbers.map((number, index) => (
        <input
          key={index}
          type="text"
          value={number}
          onChange={(e) => handleInputChange(e, index)}
          className={getCellClass(number, index)}
        />
      ))}
    </div>
  );
};

export default TablaBingo;
