export const LiftHeaderComponent = () => {
  return (
    <>
      <h2>Alberto Ferrero elevators</h2>
      <p className="mb-3 text-xs w-auto">Last maintenance { new Date().toDateString() }</p>
    </>
  );
}