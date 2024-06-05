import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IEnrollmentRepository } from '../../../repository/enrollment.repository';
import IVerifyUserAttributeRequest from '../../../dtos/verify-user-attribute/verify-user-attribute.interface';
import verifyCurrentUserAttributeRequestToDto from '../../mappers/verify-current-user-attribute/verify-current-user-attribute-serialize/verify-current-user-attribute.serialize';

class VerifyCurrentUserAttributeUseCase implements IUseCase<IVerifyUserAttributeRequest, void> {
  public repository: IEnrollmentRepository;

  constructor(repository: IEnrollmentRepository) {
    this.repository = repository;
  }

  public async execute(data: IVerifyUserAttributeRequest): Promise<void> {
    const request = verifyCurrentUserAttributeRequestToDto(data);
    return this.repository.verifyUserAttribute(request);
  }
}

export default VerifyCurrentUserAttributeUseCase;
