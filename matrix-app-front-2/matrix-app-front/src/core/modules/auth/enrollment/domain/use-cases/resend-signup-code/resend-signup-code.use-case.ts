import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IEnrollmentRepository } from '../../../repository/enrollment.repository';
import resendSignUpCodeRequestToDto from '../../mappers/resend-signup-code/resend-signup-code-serialize/resend-signup-code.serialize';
import IResendSignUpCodeRequest from '../../../dtos/resend-signup-code/resend-signup-code.interface';

class ResendSignUpUseCase implements IUseCase<IResendSignUpCodeRequest, void> {
  public repository: IEnrollmentRepository;

  constructor(repository: IEnrollmentRepository) {
    this.repository = repository;
  }

  public async execute(data: IResendSignUpCodeRequest): Promise<void> {
    const request = resendSignUpCodeRequestToDto(data);
    await this.repository.reSendSignUpCode(request);
  }
}

export default ResendSignUpUseCase;
