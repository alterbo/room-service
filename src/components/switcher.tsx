import { useState, KeyboardEvent } from'react';
import './switcher.css';

interface Props {
  onToggle?: (isChecked: boolean) => void;
}

export const SwitcherComponent = ({ onToggle }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    if (onToggle) {
      onToggle(!isChecked);
    }
  };

  const keyUpHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      toggleSwitch();
    }
  };


  return (
    <label
      className='block border borde-slate-400 p-3 switcher'
      htmlFor="switcher"
      style={{ cursor: 'pointer' }}
    >
      <div
        aria-checked={ isChecked }
        className="h-10 relative w-full z-0"
        tabIndex={ 0 }
        onClick={ toggleSwitch }
        onKeyUp={ keyUpHandler }
        role="switch"
      >
        <span className="absolute bg-slate-200 h-px left-3 right-3 top-1/2 -z-0"></span>
        <div className={
            `${ isChecked ? 'bg-yellow-50 dark:bg-slate-800 translate-x-[300%]' : 'bg-slate-200 dark:bg-slate-600 translate-x-0' }
            flex justify-center items-center h-full left-0 p-3 switcher-indicator w-1/4`
          }>
          { isChecked ? 'On' : 'Off' }
        </div>
      </div>
    </label>
  );
};