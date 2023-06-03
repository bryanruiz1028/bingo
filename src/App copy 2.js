import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado para almacenar los números del tablero de bingo
  const [bingoNumbers, setBingoNumbers] = useState(() => {
    // Obtener los números del tablero de bingo del almacenamiento local
    const savedBingoNumbers = localStorage.getItem('bingoNumbers');
    // Si hay números guardados, se cargan; de lo contrario, se crea un nuevo tablero vacío
    return savedBingoNumbers ? JSON.parse(savedBingoNumbers) : Array(25).fill('');
  });

  // Estado para almacenar los números ingresados por el usuario
  const [enteredNumbers, setEnteredNumbers] = useState(() => {
    // Obtener los números ingresados del almacenamiento local
    const savedEnteredNumbers = localStorage.getItem('enteredNumbers');
    // Si hay números guardados, se cargan; de lo contrario, se crea un arreglo vacío
    return savedEnteredNumbers ? JSON.parse(savedEnteredNumbers) : [];
  });

  // Guardar los números del tablero de bingo en el almacenamiento local al actualizar el estado
  useEffect(() => {
    localStorage.setItem('bingoNumbers', JSON.stringify(bingoNumbers));
  }, [bingoNumbers]);

  // Guardar los números ingresados en el almacenamiento local al actualizar el estado
  useEffect(() => {
    localStorage.setItem('enteredNumbers', JSON.stringify(enteredNumbers));
  }, [enteredNumbers]);

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

  // Reiniciar los números ingresados, estableciendo el estado en un arreglo vacío
  const handleReset = () => {
    setEnteredNumbers([]);
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
      <div className="bingo-container">
        <div className='tabla'>
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
        </div>
        <form onSubmit={handleNumberSubmit}>
          {/* Formulario para agregar números */}
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
            {/* Mostrar los números ingresados */}
            {enteredNumbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
          <button onClick={handleReset}>Resetear Números</button>
          {/* Botón para reiniciar los números ingresados */}
        </div>
      </div>
    </div>
  );
}

export default App;
