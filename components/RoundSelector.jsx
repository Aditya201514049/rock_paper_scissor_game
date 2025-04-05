'use client';

import { useState } from 'react';

const RoundSelector = ({ onSelectRounds }) => {
  const [rounds, setRounds] = useState(1);

  const handleChange = (event) => {
    const value = Math.max(1, Math.min(100, Number(event.target.value))); // Ensure value is between 1 and 100
    setRounds(value);
    onSelectRounds(value); // Pass selected rounds to parent component
  };

  const incrementRounds = () => {
    const newValue = Math.min(100, rounds + 1);
    setRounds(newValue);
    onSelectRounds(newValue);
  };

  const decrementRounds = () => {
    const newValue = Math.max(1, rounds - 1);
    setRounds(newValue);
    onSelectRounds(newValue);
  };

  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <label htmlFor="rounds" className="text-lg font-semibold">Select Rounds (1-100):</label>
      <div className="flex items-center">
        <button 
          onClick={decrementRounds} 
          className="btn btn-sm btn-outline"
          aria-label="Decrease rounds"
        >
          -
        </button>
        <input
          type="number"
          id="rounds"
          value={rounds}
          onChange={handleChange}
          className="input input-bordered w-20 text-center mx-2"
          min="1"
          max="100"
        />
        <button 
          onClick={incrementRounds} 
          className="btn btn-sm btn-outline"
          aria-label="Increase rounds"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default RoundSelector;
