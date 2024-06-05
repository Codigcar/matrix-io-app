import { serialize } from 'src/core/helpers/transform';
import ISignUpRequest from 'src/core/modules/auth/enrollment/dtos/sign-up/sign-up-request.interface';
import { SignUpRequestDto } from 'src/core/modules/auth/enrollment/dtos/sign-up/sign-up-request.dto';

const signUpRequestToDto = (entity: ISignUpRequest): SignUpRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      username: validatedEntity.username,
      password: validatedEntity.password,
      attributes: {
        email: validatedEntity.email,
        phone_number: validatedEntity.phoneNumber,
        'custom:referralCode': validatedEntity.referralCode ? validatedEntity.referralCode : null,
        'custom:document_number': validatedEntity.documentNumber,
      },
      clientMetadata: {
        device: validatedEntity.device,
        session: validatedEntity.session,
      },
    }),
    defaultOutput: {} as SignUpRequestDto,
  });

export default signUpRequestToDto;
