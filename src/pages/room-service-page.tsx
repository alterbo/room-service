import { useState } from 'react';
import { BuildingComponent, ClockComponent, CounterComponent, FloorsContainerComponent, HeaderComponent, LiftComponent, LiftContainerComponent, LiftControlsComponent, LiftHeaderComponent, SwitcherComponent } from '../components';
import { FLOORS } from '../data';
import { useCounter, useElementHeight, useHasStarted, useLights, useRoomService } from '../hooks';
import { Floor } from '../interfaces';
import { setCurrentPosition } from '../helpers';

const floors : Floor[] = FLOORS;

const RoomServicePage = () => {
  const [ activeFloor, setActiveFloor ] = useState<number | null>(null);
  const { hasStarted, setHasStarted } = useHasStarted();
  const { elementRef, height } = useElementHeight<HTMLDivElement>();
  const { duration, current, handleLiftTo } = useRoomService();
  const { count } = useCounter({
    activeFloor,
    current,
    hasStarted,
  });

  const handleActiveFloor = (floor: number) => {
    setActiveFloor(floor);
  };

  const { lightColors } = useLights({
    current,
    duration,
    floorsLength: floors.length,
    hasStarted,
    onActiveFloorMatch: handleActiveFloor,
  });

  const hasStartedHandler = () => {
    setHasStarted(!hasStarted);
    setActiveFloor(null);
  };

  return (
    <div className="grid grid-cols-2 grid-rows-layout h-screen w-full">
      <div className="col-span-2 px-10 py-7">
        <HeaderComponent />
      </div>
      <div ref={ elementRef } className="mb-10 ml-auto justify-self-stretch">
        <BuildingComponent>
          <FloorsContainerComponent
            className='col-span-9'
            current={ current }
            duration={ duration }
            floors={ floors }
            hasStarted={ hasStarted }
            lightColors={ lightColors }
          />
          <LiftContainerComponent
            className='col-start-10 col-span-2'
          >
            <LiftComponent
              duration={ duration }
              position={ setCurrentPosition(current, floors.length, height) }
            />
          </LiftContainerComponent>
        </BuildingComponent>
      </div>
      <div className="flex flex-col h-full justify-self-start px-1">
        <SwitcherComponent
          onToggle={ hasStartedHandler }
        />
        <div className="mb-auto mt-10">
          <LiftHeaderComponent />
          <div className="border borde-slate-200 mt-3">
            <div className="items-center bg-slate-100 dark:bg-slate-600 flex flex-wrap justify-between p-3 w-full">
              <ClockComponent
                hasStarted={ hasStarted }
              />
              <CounterComponent
                count={ count }
              />
            </div>
            <LiftControlsComponent
              current={ current }
              length={ floors.length }
              liftTo={ handleLiftTo }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomServicePage;