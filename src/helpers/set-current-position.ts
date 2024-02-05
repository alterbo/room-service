export const setCurrentPosition = (floor: number, length: number, totalHeight: number): number => {
  const height = totalHeight / length;
  return height * floor;
};