import { deserialize } from 'src/core/helpers/transform';
import { SignInDto, SignInSchema } from '../../../../dtos/signin/signin.dto';
import { ISignIn } from '../../../../dtos/signin/signin.interface';

const dtoToSignIn = (dto: SignInDto): ISignIn =>
  deserialize(dto, {
    outputSchema: SignInSchema,
    serializationLogic: (validatedDto) => ({
      jwtToken: validatedDto.signInUserSession.accessToken.jwtToken,
    }),
    defaultOutput: {
      jwtToken: '',
    },
  });

export default dtoToSignIn;
