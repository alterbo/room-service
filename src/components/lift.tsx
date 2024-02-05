interface Props {
  duration: number;
  position: number;
}

const style = { 'height': 'calc(100% / 8)' };

export const LiftComponent = ({ duration, position}: Props) => {
  return (
    <div
      className="absolute flex w-full md:px-2"
      style={{
        bottom: 0,
        height: style.height,
        transform: `translateY(-${ position }px)`,
        transitionDelay: '1s',
        transitionDuration: `${ duration + 1 }s`,
        transitionProperty: 'transform',
      }}>
      <div className="bg-white dark:bg-slate-800 border border-slate-400 h-2/3 px-2 pt-3 self-end w-full">
      </div>
    </div>
  );
}