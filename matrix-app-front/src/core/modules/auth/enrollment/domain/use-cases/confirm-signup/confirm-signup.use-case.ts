import { IUseCase } from 'src/core/contracts/use-case.interface';
import confirmSignUpRequestToDto from '../../mappers/confirm-signup/confirm-signup-serialize/confirm-signup.serialize';
import { IEnrollmentRepository } from '../../../repository/enrollment.repository';
import IConfirmSignUpRequest from '../../../dtos/confirm-signup/confirm-signup.interface';

class ConfirmSignUpUseCase implements IUseCase<IConfirmSignUpRequest, void> {
  public repository: IEnrollmentRepository;

  constructor(repository: IEnrollmentRepository) {
    this.repository = repository;
  }

  public async execute(data: IConfirmSignUpRequest): Promise<void> {
    const request = confirmSignUpRequestToDto(data);
    await this.repository.confirmSignup(request);
  }
}

export default ConfirmSignUpUseCase;
