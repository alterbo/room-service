interface Props {
  children: JSX.Element[];
}

export const BuildingComponent = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-12 grid-flow-row-dense h-full px-1 md:px-10 overflow-hidden w-full">
      { children }
    </div>
  );
};
