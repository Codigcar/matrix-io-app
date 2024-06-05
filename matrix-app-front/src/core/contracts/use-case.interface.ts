export interface IUseCase<TRequest, TResponse> {
  repository: any;
  execute(data: TRequest): Promise<TResponse> | TResponse;
}
