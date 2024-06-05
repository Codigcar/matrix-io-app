import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IEnrollmentRepository } from '../../../repository/enrollment.repository';
import IVerifyUserAttributeRequest from '../../../dtos/verify-user-attribute/verify-user-attribute.interface';
import sendVerifyCodeAttributeRequestToDto from '../../mappers/send-verify-code-attribute/send-verify-code-attribute-serialize/send-verify-code-attribute.serialize';
import { ISendVerifyCodeAttributeRequest } from '../../../dtos/send-verify-code-attribute/send-verify-code-attribute-request.interface';

class SendVerifyCodeAttributeUseCase implements IUseCase<IVerifyUserAttributeRequest, void> {
  public repository: IEnrollmentRepository;

  constructor(repository: IEnrollmentRepository) {
    this.repository = repository;
  }

  public async execute(data: ISendVerifyCodeAttributeRequest): Promise<void> {
    const request = sendVerifyCodeAttributeRequestToDto(data);
    return this.repository.sendVerifyCodeAttribute(request);
  }
}

export default SendVerifyCodeAttributeUseCase;
