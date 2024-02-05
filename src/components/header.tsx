import { CoffeeCup } from ".";

export const HeaderComponent = () => {
  return (
    <div className="grid grid-cols-layout">
      <CoffeeCup className="mr-2 row-span-2" />
      <h1 className="text-3xl">Room service</h1>
      <p>Deliver the coffee</p>
    </div>
  );
}