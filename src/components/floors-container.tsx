import { FloorComponent } from '.';
import { Floor } from '../interfaces';

interface Props {
  className: string;
  current: number;
  duration: number;
  floors: Floor[];
  hasStarted: boolean;
  lightColors: string[];
}

export const FloorsContainerComponent = ({ className, current, duration, floors, hasStarted, lightColors }: Props)  => {
  return (
    <div className={ className }>
      <div className="border-l border-slate-400 border-t flex-grow grid max-x-auto max-w min-h-full">
        {
          floors.map(({ id, label }, index) => (
            <FloorComponent
              active={ current === Number(id) }
              duration={ duration }
              hasStarted={ hasStarted }
              key={ id }
              label={ label }
              light={ lightColors[index] }
            />
          )).reverse()
        }
      </div>
    </div>
  );
}