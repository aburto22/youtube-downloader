import { ITime } from '../types';

export const getDispTime = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

export const secsToMins = (time: number): string => {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  return `${mins}:${getDispTime(secs)}`;
};

export const checkSongHasChanged = (start: ITime, end: ITime, duration: number): boolean => {
  if (start.min !== 0 || start.sec !== 0) {
    return true;
  }

  if (end.min * 60 + end.sec !== duration) {
    return true;
  }

  return false;
};
