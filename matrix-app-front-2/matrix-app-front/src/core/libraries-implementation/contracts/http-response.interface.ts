export interface IHttpResponse<T = any> {
  data: T;
  status: number;
}
