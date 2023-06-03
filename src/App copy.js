import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tables, setTables] = useState(() => {
    const savedTables = localStorage.getItem('tables');
    return savedTables ? JSON.parse(savedTables) : [[]];
  });

  const [enteredNumbers, setEnteredNumbers] = useState(() => {
    const savedEnteredNumbers = localStorage.getItem('enteredNumbers');
    return savedEnteredNumbers ? JSON.parse(savedEnteredNumbers) : [];
  });

  useEffect(() => {
    localStorage.setItem('tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('enteredNumbers', JSON.stringify(enteredNumbers));
  }, [enteredNumbers]);

  const handleTableInputChange = (e, tableIndex, cellIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex][cellIndex] = e.target.value;
    setTables(updatedTables);
  };

  const handleAddTable = (e) => {
    e.preventDefault();
    const newTable = Array(25).fill('');
    setTables([...tables, newTable]);
  };

  const handleNumberSubmit = (e) => {
    e.preventDefault();
    const enteredNumber = e.target.numberInput.value.trim();
    if (enteredNumber !== '') {
      setEnteredNumbers([...enteredNumbers, enteredNumber]);
      e.target.numberInput.value = '';
    }
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
        {tables.map((table, tableIndex) => (
          <div key={tableIndex} className="bingo-board">
            {table.map((number, index) => (
              <input
                key={index}
                type="text"
                value={number}
                onChange={(e) => handleTableInputChange(e, tableIndex, index)}
                className={getCellClass(number, index)}
              />
            ))}
          </div>
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
      <button onClick={handleAddTable}>Agregar tabla</button>
    </div>
  );
}

export default App;


