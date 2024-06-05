import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IPasswordRepository } from '../../../repository/password.repository';
import IConfirmPasswordRequest from '../../../dtos/confirm-password/confirm-password-request.interface';
import confirmPasswordRequestToDto from '../../mappers/confirm-password/confirm-password-serialize/confirm-password.serialize';

/**
 * ConfirmPasswordUseCase Class
 *
 * This class implements the use case for confirming a password.
 * It utilizes a password repository (IPasswordRepository) to perform the operation.
 *
 * @implements IUseCase<IConfirmPasswordRequest, void>
 */
class ConfirmPasswordUseCase implements IUseCase<IConfirmPasswordRequest, void> {
  /**
   * Property: repository
   *
   * The password repository used for confirming the password.
   */
  public repository: IPasswordRepository;

  /**
   * Constructor of ConfirmPasswordUseCase
   *
   * @param repository The password repository to be used in the use case.
   */
  constructor(repository: IPasswordRepository) {
    this.repository = repository;
  }

  /**
   * Method: execute
   *
   * This method is responsible for executing the use case to confirm a password.
   *
   * @param data The data required for confirming the password.
   * @returns A promise that resolves to "void" once the password is confirmed.
   */
  public async execute(data: IConfirmPasswordRequest): Promise<void> {
    // Converts the data from IConfirmPasswordRequest to a format suitable for the repository.
    const request = confirmPasswordRequestToDto(data);

    // Calls the repository's method to confirm the password.
    return this.repository.confirmPassword(request);
  }
}

export default ConfirmPasswordUseCase;
