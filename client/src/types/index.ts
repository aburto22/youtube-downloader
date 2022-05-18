export interface ISong {
  title: string;
  src: string;
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
