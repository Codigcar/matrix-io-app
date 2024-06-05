import { AuthConfig } from 'src/core/config/auth.config';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IEnrollmentRepository } from '../../../repository/enrollment.repository';
import signInRequestToDto from '../../mappers/signin/signin-serialize/signin.serialize';
import { ISignInRequest } from '../../../dtos/signin/signin-request.interface';
import { ISignIn } from '../../../dtos/signin/signin.interface';
import dtoToSignIn from '../../mappers/signin/signin-deserialize/signin.deserialize';

class SignInUseCase implements IUseCase<ISignInRequest, ISignIn> {
  public repository: IEnrollmentRepository;

  constructor(repository: IEnrollmentRepository) {
    this.repository = repository;
  }

  public async execute(data: ISignInRequest): Promise<ISignIn> {
    const request = signInRequestToDto(data);
    await this.repository.configureAuth(AuthConfig);
    const response = await this.repository.signIn(request);
    return dtoToSignIn(response);
  }
}

export default SignInUseCase;
