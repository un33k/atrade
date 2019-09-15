/** Returns a random number between 0 and max */
export const getRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};
