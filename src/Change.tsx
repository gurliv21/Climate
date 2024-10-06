import React, { useState } from 'react';
import Co from './gases/Co'; // Line chart component for CO₂
import No from './gases/Ni';
import So from './gases/So';  // Line chart component for N₂O
import Ch4 from './gases/Ch4'; // Line chart component for CH₄
import Nox from './gases/Nox'; // Line chart component for NOₓ

const gases = [
  'Carbon Dioxide (CO₂)',
  'Nitrous Oxide (N₂O)',
  'Methane (CH₄)',
  'Sulfur Dioxide (SO₂)',
  'Nitrogen Oxides (NOₓ)',
];

const Change: React.FC = () => {
  const [selectedGas, setSelectedGas] = useState<string>('Carbon Dioxide (CO₂)');

  const handleGasChange = (gas: string) => {
    setSelectedGas(gas);
  };

  const renderChart = () => {
    switch (selectedGas) {
      case 'Carbon Dioxide (CO₂)':
        return <Co />;
      case 'Nitrous Oxide (N₂O)':
        return <No />;
      case 'Sulfur Dioxide (SO₂)':
        return <So />;
      case 'Methane (CH₄)':
        return <Ch4 />;
      case 'Nitrogen Oxides (NOₓ)':
        return <Nox />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 mb-36">
      <h1 className="pointer-events-none  whitespace-pre-wrap bg-gradient-to-b from-gray-700 to-gray-300/80 bg-clip-text text-center text-2xl md:text:4xl lg:text-5xl font-bold leading-none text-transparent dark:from-white dark:to-slate-900/10 mb-14 ">
        Gas Emissions Consumption: {selectedGas}
      </h1>
      <div className="flex flex-wrap justify-center mb-16">
        {gases.map((gas) => (
          <button
            key={gas}
            onClick={() => handleGasChange(gas)}
            className={`mx-2 mb-2 px-4 py-2 rounded-lg transition-colors duration-300 font-bold
              ${selectedGas === gas ? 'border-color-text  text-white' : 'bg-gray-900 text-gray-300'}`}
          >
            {gas}
          </button>
        ))}
      </div>

      {/* Render the corresponding line chart based on the selected gas */}
      <div className="w-full max-w-xl mx-auto">{renderChart()}</div>
    </div>
  );
};

export default Change;
