import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bingoNumbers, setBingoNumbers] = useState(() => {
    const savedBingoNumbers = localStorage.getItem('bingoNumbers');
    return savedBingoNumbers ? JSON.parse(savedBingoNumbers) : Array(25).fill('');
  });

  const [enteredNumbers, setEnteredNumbers] = useState(() => {
    const savedEnteredNumbers = localStorage.getItem('enteredNumbers');
    return savedEnteredNumbers ? JSON.parse(savedEnteredNumbers) : [];
  });

  useEffect(() => {
    localStorage.setItem('bingoNumbers', JSON.stringify(bingoNumbers));
  }, [bingoNumbers]);

  useEffect(() => {
    localStorage.setItem('enteredNumbers', JSON.stringify(enteredNumbers));
  }, [enteredNumbers]);

  const handleInputChange = (e, index) => {
    const updatedNumbers = [...bingoNumbers];
    updatedNumbers[index] = e.target.value;
    setBingoNumbers(updatedNumbers);
  };

  const handleNumberSubmit = (e) => {
    e.preventDefault();
    const enteredNumber = e.target.numberInput.value.trim();
    if (enteredNumber !== '') {
      setEnteredNumbers([...enteredNumbers, enteredNumber]);
      e.target.numberInput.value = '';
    }
  };

  const handleReset = () => {
    setEnteredNumbers([]);
  };

  const getCellClass = (number, index) => {
    if (enteredNumbers.includes(number)) {
      return 'bingo-cell highlighted';
    }
    return 'bingo-cell';
  };

  return (
    <div className="app">
      <h1>BINGO</h1>
      <div className="bingo-container">
        <div className="bingo-board">
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
        
        <form onSubmit={handleNumberSubmit}>
          <input
            type="text"
            name="numberInput"
            placeholder="Ingresar número"
          />
          <button type="submit">Agregar</button>
        </form>
        <div className="entered-numbers">
          <h2>Números Ingresados:</h2>
          <ul>
            {enteredNumbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
          <button onClick={handleReset}>Resetear Números</button>
        </div>
      </div>
    </div>
  );
}

export default App;
