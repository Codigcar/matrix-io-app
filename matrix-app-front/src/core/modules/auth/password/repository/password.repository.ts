import { RecoverPasswordDto } from '../dtos/recover-password/recover-password.dto';
import { ConfirmPasswordRequestDto } from '../dtos/confirm-password/confirm-password-request.dto';
import { RecoverPasswordRequestDto } from '../dtos/recover-password/recover-password-request.dto';

export interface IPasswordRepository {
  forgotPassword(data: RecoverPasswordRequestDto): Promise<RecoverPasswordDto>;
  confirmPassword(data: ConfirmPasswordRequestDto): Promise<void>;
}
