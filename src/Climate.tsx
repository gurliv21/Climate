import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import Co from '@/gases/Co.tsx'
// Paths for the 7 phases of the tree decomposition
const imagePaths = [
  '/Untitled design/1.png',
  '/Untitled design/2.png',
  '/Untitled design/3.png',
  '/Untitled design/4.png',
  '/Untitled design/5.png',
  '/Untitled design/6.png',
  '/Untitled design/7.png',
];

// List of gases
const gases = ['Greenhouse gases (GHGs)', 'Carbon dioxide (CO₂)', 'Methane (CH₄)', 'Fossil fuel'];

function Climate() {
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedGas, setSelectedGas] = useState('Greenhouse gases (GHGs)');

  // Function to map the slider value (0 to 100) to one of the 7 images
  const getImageIndex = (value: number) => {
    const index = Math.floor((value / 100) * (imagePaths.length - 1));
    return index;
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-screen p-8 bg-black rounded-lg border bg-background">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8 text-white">Effects of {selectedGas} on Tree Health</h1>

      {/* Buttons for selecting different gases */}
      <div className="flex justify-center mb-8 space-x-4">
        {gases.map((gas) => (
          <button
            key={gas}
            onClick={() => setSelectedGas(gas)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              selectedGas === gas ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            {gas}
          </button>
        ))}
      </div>
      {/* Slider for controlling tree decomposition phases */}
      <Slider
        defaultValue={[0]}
        max={100}
        step={1}
        onValueChange={(value) => setSliderValue(value[0])}
        className="w-full max-w-lg mb-16"
      />

      {/* Image displaying the decomposition phase based on the slider value */}
      <div className="mb-8">
        <img
          src={imagePaths[getImageIndex(sliderValue)]}
          alt={`Phase ${getImageIndex(sliderValue) + 1} of Tree`}
          className="max-w-full h-auto rounded-xl shadow-lg"
        />
      </div>
      <Co/>

      
    </div>
  );
}

export default Climate;
