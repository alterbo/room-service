import { useState } from 'react';

export const useRoomService = () => {

  const [ duration, setDuration ] = useState<number>( 1 );
  const [ current, setCurrent ] = useState<number>( 0 );
  const [ isMoving, setIsMoving ] = useState<boolean>( false );

  const handleLiftTo = (value: number) => {
    setCurrent(value);
  }

  const liftTo = (value: number) => {
    setIsMoving(true);
    setDuration(Math.abs(value - current));
    setCurrent(value);
    setTimeout(() => {
      setIsMoving(false);
    }, (Math.abs(value - current) * 1000) + 1000);
  }

  return {
    duration,
    current,
    handleLiftTo,
    isMoving,
    liftTo,
    setCurrent,
  }
};