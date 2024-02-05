import { useState } from 'react';

export const useHasStarted = () => {
  const [ hasStarted, setHasStarted ] = useState(false);

  return {
    hasStarted,
    setHasStarted,
  };
};