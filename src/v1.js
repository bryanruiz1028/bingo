import React, { useState } from 'react';
import './App.css';

function App() {
  // Estado para almacenar los números del tablero de bingo
  const [bingoNumbers, setBingoNumbers] = useState(Array(25).fill(''));

  // Estado para almacenar los números ingresados por el usuario
  const [enteredNumbers, setEnteredNumbers] = useState([]);

  // Manejar el cambio de valor en una celda del tablero
  const handleInputChange = (e, index) => {
    const updatedNumbers = [...bingoNumbers];
    updatedNumbers[index] = e.target.value;
    setBingoNumbers(updatedNumbers);
  };

  // Manejar el envío de un número ingresado por el usuario
  const handleNumberSubmit = (e) => {
    e.preventDefault();
    const enteredNumber = e.target.numberInput.value.trim();
    if (enteredNumber !== '') {
      setEnteredNumbers([...enteredNumbers, enteredNumber]);
      e.target.numberInput.value = '';
    }
  };

  // Obtener la clase de estilo para una celda del tablero
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
        </div>
      </div>
    </div>
  );
}

export default App;
