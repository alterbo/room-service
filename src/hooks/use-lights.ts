import { useState, useEffect } from 'react';

interface Props {
  current: number;
  duration: number;
  floorsLength: number;
  hasStarted: boolean;
  onActiveFloorMatch: (activeFloor: number) => void;
}

export const useLights = ({ current, duration, floorsLength, hasStarted, onActiveFloorMatch }: Props) => {
  const [lightColors, setLightColors] = useState<Array<string>>(new Array(floorsLength).fill('white'));
  const [lastRandomFloor, setLastRandomFloor] = useState<number | null>(null);

  useEffect(() => {
    if (!hasStarted) return;
    const updateLightColors = () => {
      let randomFloor: number;
      do {
        randomFloor = Math.floor(Math.random() * floorsLength);
      } while (randomFloor === current || randomFloor === lastRandomFloor);

      setLastRandomFloor(randomFloor);

      setLightColors(prevColors => {
        const newColors = prevColors.map((color, index) => {
          return index === randomFloor ? 'yellow' : color;
        });
        return newColors;
      });
    };
    const lightTimer = setInterval(updateLightColors, 5000);
    return () => {
      clearInterval(lightTimer);
    };
  }, [ floorsLength, current, hasStarted, lastRandomFloor ]);

  useEffect(() => {
    if (!hasStarted) return;
    if (current !== null) {
      const timeout = setTimeout(() => {
        setLightColors(prevColors => {
          return prevColors.map((color, index) => {
            if (index === current && color === 'yellow') {
              onActiveFloorMatch(current);
            }
            return index === current ? 'white' : color;
          });
        });
      }, (duration + 3.5) * 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [ current, duration, hasStarted, onActiveFloorMatch ]);

  return {
    lightColors,
    setLightColors,
  };
};
