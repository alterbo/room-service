import { ReactElement } from 'react';

interface Props {
  className: string;
  children: ReactElement;
}

export const LiftContainerComponent = ({ className, children }: Props) => {
  return (
    <div className={ className }>
      <div className='bg-white border border-slate-400 dark:bg-black h-full w-10 md:w-20 relative'>
        <div className='absolute border-l-2 border-slate-400 h-full left-2/4 top-0 z-0'></div>
        <div className='flex flex-col h-full'>
          <div className='basis'></div>
            { children }
        </div>
      </div>
    </div>
  );
}