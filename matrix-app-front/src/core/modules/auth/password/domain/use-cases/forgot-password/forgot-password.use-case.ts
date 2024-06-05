import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IPasswordRepository } from '../../../repository/password.repository';
import IRecoverPasswordRequest from '../../../dtos/recover-password/recover-password-request.interface';
import IRecoverPassword from '../../../dtos/recover-password/recover-password.interface';
import recoverPasswordRequestToDto from '../../mappers/recover-password/recover-password-serialize/recover-password.serialize';
import dtoToRecoverPassword from '../../mappers/recover-password/recover-password-deserialize/recover-password.deserialize';

/**
 * ForgotPasswordUseCase Class
 *
 * This class implements the use case for handling the password recovery process.
 * It utilizes a password repository (IPasswordRepository) to perform the necessary operations.
 *
 * @implements IUseCase<IRecoverPasswordRequest, IRecoverPassword>
 */
class ForgotPasswordUseCase implements IUseCase<IRecoverPasswordRequest, IRecoverPassword> {
  /**
   * Property: repository
   *
   * The password repository used for handling the password recovery process.
   */
  public repository: IPasswordRepository;

  /**
   * Constructor of ForgotPasswordUseCase
   *
   * @param repository The password repository to be used in the use case.
   */
  constructor(repository: IPasswordRepository) {
    this.repository = repository;
  }

  /**
   * Method: execute
   *
   * This method is responsible for executing the use case to handle the password recovery process.
   *
   * @param data The data required for initiating the password recovery.
   * @returns A promise that resolves to a "IRecoverPassword" object once the recovery is complete.
   */
  public async execute(data: IRecoverPasswordRequest): Promise<IRecoverPassword> {
    // Converts the data from IRecoverPasswordRequest to a format suitable for the repository.
    const request = recoverPasswordRequestToDto(data);

    // Calls the repository's method to initiate the password recovery.
    const response = await this.repository.forgotPassword(request);

    // Converts the repository's response to a "IRecoverPassword" object.
    return dtoToRecoverPassword(response);
  }
}

export default ForgotPasswordUseCase;
