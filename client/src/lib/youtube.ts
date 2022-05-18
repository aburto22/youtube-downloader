import { IFetchReturn } from '../types';

type IArgs = [string, { [key: string]: any }];

export const fetchSong = async (...args: IArgs): Promise<IFetchReturn> => {
  const res = await fetch(...args);
  const json: IFetchReturn = await res.json();
  return json;
};
