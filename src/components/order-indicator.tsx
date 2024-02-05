interface Props {
  light: string;
}

export const OrderIndicatorComponent = ({ light = 'white' }: Props) => {
  return (
    <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <circle className="fill-white dark:fill-black stroke-slate-400" cx="5" cy="5" r="3" strokeWidth={ 0.25 }/>
      <circle cx="5" cy="5" r="2" fill={ light } />
    </svg>
  );
};
