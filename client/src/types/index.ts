export interface ISong {
  title: string;
  base64: string;
  bitrate: string;
  duration: number;
}

export interface IFetchSuccess {
  status: 'success';
  data: ISong;
}

export interface IFetchError {
  status: 'error';
  code: number;
  message: string;
}

export type IFetchReturn = IFetchSuccess | IFetchError;

export interface ITime {
  min: number;
  sec: number;
}
