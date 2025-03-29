'use client';

import { useState } from 'react';

const RoundSelector = ({ onSelectRounds }) => {
  const [rounds, setRounds] = useState(1);

  const handleChange = (event) => {
    const value = Math.max(1, Math.min(100, Number(event.target.value))); // Ensure value is between 1 and 100
    setRounds(value);
    onSelectRounds(value); // Pass selected rounds to parent component
  };

  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <label htmlFor="rounds" className="text-lg font-semibold">Select Rounds (1-100):</label>
      <input
        type="number"
        id="rounds"
        value={rounds}
        onChange={handleChange}
        className="input input-bordered w-24 text-center"
        min="1"
        max="100"
      />
    </div>
  );
};

export default RoundSelector;
