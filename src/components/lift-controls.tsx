import { LiftButtonComponent } from '.';

interface Props {
  current: number;
  length: number;
  liftTo: (value: number) => void;
}

export const LiftControlsComponent = ({ current, length, liftTo }: Props) => {

  const liftFloors = Array.from({ length }, (_x, i) => i)

  return (
    <div className="grid grid-cols-2 gap-2 justify-center p-3 md:p-10">
      {
        liftFloors.map(floorNo => (
          <LiftButtonComponent
            current={ current }
            key={ floorNo }
            liftTo={ liftTo }
            no={ floorNo }
          />
        )).reverse()
      }
    </div>
  );
};