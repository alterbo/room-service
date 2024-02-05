import { CoffeeCup, OrderIndicatorComponent } from '.';

interface Props {
  active: boolean;
  duration: number;
  hasStarted: boolean;
  label: string;
  light: string;
}

export const FloorComponent = ({
  active = false,
  duration,
  hasStarted,
  label,
  light,
}: Props) => {

  return (
    <div className="dark:bg-black border-b border-slate-400 flex h-full relative w-full">
      <div className="absolute flex flex-col h-full left-0 z-10">
        <h2 className="left-0 mb-1 mx-3 mt-3 text-sm">{ label }</h2>
        <div className="mx-1 w-10">
          <OrderIndicatorComponent
            light={ light }
          />
        </div>
      </div>
      <div className="h-2/3 relative self-end w-full">
        <div className="absolute flex justify-end h-full left-2/4 outline-1 outline outline-slate-400 w-2/12">
          <div className="bg-white dark:bg-black w-full"></div>
        </div>
        {
          hasStarted && active && <CoffeeCup
            className="absolute max-w-35 md:max-w-47"
            style={{
              animationDelay: `${duration + 2}s`,
              animationDuration: '5s',
              animationName: 'coffeeOut',
              bottom: 0,
              left: 0,
            }}
          />
        }
        <div className="absolute bg-white border-r border-slate-400 dark:bg-black h-full left-0 mr-1 right-2/4 w-6/12 z-2"></div>
      </div>
    </div>
  );
}