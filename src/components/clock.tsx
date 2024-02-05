import { useEffect, useState } from 'react';

interface Props {
  hasStarted: boolean;
}

export const ClockComponent = ({ hasStarted }: Props) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number;

    if (hasStarted) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const currentTime = Date.now() - startTime;
        setTime(currentTime);
        if (currentTime >= 600000) {
          clearInterval(interval);
        }
      }, 100);
    } else {
      setTime(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [hasStarted]);

  const formattedTime = (time / 1000).toFixed(1);

  return (
    <div className="min-w-screen">
      <span className="text-xs whitespace-nowrap">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 490 490"><path d="M245 0C109.5 0 0 109.5 0 245s109.5 245 245 245 245-109.5 245-245S380.5 0 245 0zm0 449.3c-112.6 0-204.3-91.7-204.3-204.3S132.4 40.7 245 40.7 449.3 132.4 449.3 245 357.6 449.3 245 449.3z"/><path d="M290.9 224.1h-25v-95.9c0-11.5-9.4-20.9-20.9-20.9s-20.9 9.4-20.9 20.9V245c0 11.5 9.4 20.9 20.9 20.9h45.9c11.5 0 20.9-9.4 20.9-20.9s-9.5-20.9-20.9-20.9z"/></svg>  
        { formattedTime }
      </span>
    </div>
  );
}