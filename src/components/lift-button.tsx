interface Props {
  current: number;
  liftTo: (value: number) => void;
  no: number;
}
export const LiftButtonComponent = ({ current, liftTo, no }: Props) => {

  return (
    <button
      className={`${ no === current ? 'bg-yellow-50 dark:bg-slate-800' : 'bg-white dark:bg-slate-600' } box-border border-slate-400 p-3 rounded-none`}
      key={ no }
      onClick={ () => liftTo(no) }
    >
      { no }
    </button>
  );
};