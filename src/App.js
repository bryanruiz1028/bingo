import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado para almacenar las tablas de bingo
  const [bingoTables, setBingoTables] = useState([]);

  // Estado para almacenar los números ingresados por el usuario
  const [enteredNumbers, setEnteredNumbers] = useState([]);

  // Crear una nueva tabla de bingo
  const createNewTable = () => {
    return Array(25).fill('');
  };

  // Agregar una nueva tabla de bingo
  const addNewTable = () => {
    setBingoTables([...bingoTables, createNewTable()]);
  };

  // Manejar el cambio de valor en una celda del tablero
  const handleInputChange = (e, tableIndex, cellIndex) => {
    const updatedTables = [...bingoTables];
    updatedTables[tableIndex][cellIndex] = e.target.value;
    setBingoTables(updatedTables);
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

  // Reiniciar los números ingresados
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

  useEffect(() => {
    const savedTables = localStorage.getItem('bingoTables');
    if (savedTables) {
      setBingoTables(JSON.parse(savedTables));
    } else {
      // Si no hay tablas guardadas, se crea una nueva tabla inicial
      addNewTable();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bingoTables', JSON.stringify(bingoTables));
  }, [bingoTables]);

  return (
    <div className="app">
      <div className="bingo-container">
        {bingoTables.map((table, tableIndex) => (
          <div className="tabla" key={tableIndex}>
            <div className="bingo-board">
              {/* Renderizar las celdas del tablero */}
              {table.map((number, cellIndex) => (
                <input
                  key={cellIndex}
                  type="text"
                  value={number}
                  onChange={(e) => handleInputChange(e, tableIndex, cellIndex)}
                  className={getCellClass(number, cellIndex)}
                />
              ))}
            </div>
          </div>
        ))}
        <button onClick={addNewTable}>Añadir Tabla</button>
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
