export const secsToMins = (time: number): [number, number] => {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  return [mins, secs];
};
