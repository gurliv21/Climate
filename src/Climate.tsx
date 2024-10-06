import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import Change from './Change';

// Paths for the phases of tree decomposition
const imagePaths: string[] = [
  '/Untitled design/1.png',
  '/Untitled design/2.png',
  '/Untitled design/3.png',
  '/Untitled design/4.png',
  '/Untitled design/5.png',
  '/Untitled design/6.png',
  '/Untitled design/7.png',
];

// Define the structure of gas level description
interface GasLevelDescription {
  level: string;
  impact: string;
}

function Climate() {
  const [sliderValue, setSliderValue] = useState<number>(0);

  // Function to map the slider value (0 to 100) to one of the images
  const getImageIndex = (value: number): number => {
    return Math.floor((value / 100) * (imagePaths.length - 1));
  };

  // Get the gas level description based on the slider value (ppm)
  const getGasLevelDescription = (value: number): GasLevelDescription => {
    if (value <= 33) {
      return { level: 'Low (0-333 ppm)', impact: 'Healthy trees thriving with minimal gas interference.' };
    } else if (value <= 66) {
      return { level: 'Moderate (334-666 ppm)', impact: 'Trees experiencing moderate stress due to rising gas levels.' };
    } else {
      return { level: 'High (667-1000 ppm)', impact: 'Severe impacts on tree health, leading to potential decline.' };
    }
  };

  // Convert slider value to ppm (0-100 mapped to 0-1000 ppm)
  const ppmValue = (sliderValue / 100) * 1000;
  const {  impact } = getGasLevelDescription(sliderValue);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-screen p-8 ">
      <Change />
      <div className="border rounded-2xl p-10 px-8  shadow-lg w-full max-w-4xl flex flex-col text-center" style={{ backgroundColor: 'rgba(232, 234, 237, 0.09)' }}>
        <h1 className="text-4xl font-bold mb-2 text-white">Effects on Tree Health</h1>
        <h2 className="text-lg mb-6 text-white">Understanding the Impact of Gas Levels</h2>

        <div>
          {/* Slider for controlling gas levels in ppm */}
          <Slider
            defaultValue={[0]}
            max={100}
            step={1}
            onValueChange={(value) => setSliderValue(value[0])}
            className="w-full mb-6"
          />
          {/* Gas level and phase */}
          <div className="flex justify-between mb-4 text-white">
            <span>Gas Level: {ppmValue.toFixed(0)} ppm</span>
            <span>Phase: {getImageIndex(sliderValue) + 1}</span>
          </div>
          {/* Impact description */}
          <p className="text-white text-sm">{impact}</p>

          {/* Image displaying the decomposition phase based on the slider value */}
          <div className="mb-8 flex text-center justify-center">
            <img
              src={imagePaths[getImageIndex(sliderValue)]}
              alt={`Phase ${getImageIndex(sliderValue) + 1} of Tree`}
              className="max-w-full h-auto rounded-xl shadow-lg"
            />
          </div>
          <p className="text-white text-sm">
            This image represents how trees are affected by varying levels of different gases in the atmosphere. As gas levels increase, tree health may decline, leading to various visual changes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Climate;
