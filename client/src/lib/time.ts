export const getDispTime = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

export const secsToMins = (time: number): string => {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  return `${mins}:${getDispTime(secs)}`;
};
