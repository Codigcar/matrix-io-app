import { serialize } from 'src/core/helpers/transform';
import { ISignInRequest } from '../../../../dtos/signin/signin-request.interface';
import { SignInRequestDto } from '../../../../dtos/signin/signin-request.dto';

const signInRequestToDto = (entity: ISignInRequest): SignInRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      username: validatedEntity.username,
      password: validatedEntity.password,
      metadata: {
        device: validatedEntity.device,
        session: validatedEntity.recaptchaToken,
      },
    }),
    defaultOutput: {} as SignInRequestDto,
  });

export default signInRequestToDto;
