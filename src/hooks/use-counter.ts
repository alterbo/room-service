import { useEffect, useState } from 'react';

interface Props {
  activeFloor: number | null;
  current: number;
  hasStarted: boolean;
}

export const useCounter = ({ activeFloor, current, hasStarted }: Props) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!hasStarted) {
      setCount(0);
    }
  }, [hasStarted]);

  useEffect(() => {
    if (activeFloor === current) {
      setCount(prevCount => prevCount + 1);
    }
  }, [activeFloor, current]);

  return {
    count,
  };
};