import { IUseCase } from 'src/core/contracts/use-case.interface';
import ISignUp from 'src/core/modules/auth/enrollment/dtos/sign-up/sign-up.interface';
import ISignUpRequest from 'src/core/modules/auth/enrollment/dtos/sign-up/sign-up-request.interface';
import signUpRequestToDto from 'src/core/modules/auth/enrollment/domain/mappers/sign-up/sign-up-serialize/sign-up.serialize';
import { IEnrollmentRepository } from 'src/core/modules/auth/enrollment/repository/enrollment.repository';
import dtoToSignUp from '../../mappers/sign-up/sign-up-deserialize/sign-up.deserialize';

class SignUpUseCase implements IUseCase<ISignUpRequest, ISignUp> {
  public repository: IEnrollmentRepository;

  constructor(repository: IEnrollmentRepository) {
    this.repository = repository;
  }

  public async execute(data: ISignUpRequest): Promise<ISignUp> {
    const request = signUpRequestToDto(data);

    const response = await this.repository.signUp(request);

    return dtoToSignUp(response);
  }
}

export default SignUpUseCase;
