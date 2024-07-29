export interface Response<T> {
  statusCode: number;
  message: string;
  list: null;
  data: T;
}
