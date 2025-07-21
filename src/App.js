import React, { useState } from 'react';
import './App.css';

function Ctable({ type, nombre }) {
  let operation, symbol;
  switch (type) {
    case '*': operation = (a, b) => a * b; symbol = '×'; break;
    case '+': operation = (a, b) => a + b; symbol = '+'; break;
    case '-': operation = (a, b) => a - b; symbol = '-'; break;
    case '/': operation = (a, b) => b !== 0 ? (a / b).toFixed(2) : '∞'; symbol = '÷'; break;
    default: operation = (a, b) => a + b; symbol = '?';
  }
  return (
    <table className="table-op">
      <thead>
        <tr>
          <th colSpan="5">Table de {type === '*' ? 'Multiplication' : type === '+' ? 'Addition' : type === '-' ? 'Soustraction' : type === '/' ? 'Division' : 'Opération'} pour {nombre}</th>
        </tr>
        <tr>
          <th>Nombre</th>
          <th>Opération</th>
          <th>i</th>
          <th>=</th>
          <th>Résultat</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(10).keys()].map(i => (
          <tr key={i+1}>
            <td>{nombre}</td>
            <td>{symbol}</td>
            <td>{i+1}</td>
            <td>=</td>
            <td>{operation(nombre, i+1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [nombre, setNombre] = useState(1);
  const [type, setType] = useState('*');
  const [showTable, setShowTable] = useState(false);

  const handleShowTable = (e) => {
    e.preventDefault();
    setShowTable(true);
  };

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Table d'opération</h2>
      <form onSubmit={handleShowTable} style={{ marginBottom: '20px' }}>
        <label>
          Choisir un nombre :
          <input
            type="number"
            min="1"
            value={nombre}
            onChange={e => setNombre(Number(e.target.value))}
            style={{ width: '80px', margin: '0 10px' }}
            required
          />
        </label>
        <label>
          Opération :
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            style={{ margin: '0 10px' }}
          >
            <option value="*">Multiplication</option>
            <option value="+">Addition</option>
            <option value="-">Soustraction</option>
            <option value="/">Division</option>
          </select>
        </label>
        <button type="submit">Afficher la table</button>
      </form>
      {showTable && <Ctable type={type} nombre={nombre} />}
    </div>
  );
}

export default App;
