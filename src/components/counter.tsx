interface Props {
  count: number
}

export const CounterComponent = ({ count }: Props) => {

  return (
    <div className="bg-white dark:bg-black flex items-center min-w-screen p-3">
      <span className="mr-3 text-xs">Score:</span>
      <span className="text-3xl">{ count }</span>
    </div>
  );
};