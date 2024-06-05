import { deserialize } from 'src/core/helpers/transform';
import { SignUpDto, SignUpSchema } from 'src/core/modules/auth/enrollment/dtos/sign-up/sign-up.dto';
import ISignUp from 'src/core/modules/auth/enrollment/dtos/sign-up/sign-up.interface';

const dtoToSignUp = (dto: SignUpDto): ISignUp =>
  deserialize(dto, {
    outputSchema: SignUpSchema,
    serializationLogic: (validatedDto) => ({
      userSub: validatedDto.userSub,
      deliveryMedium: validatedDto.codeDeliveryDetails.DeliveryMedium,
    }),
    defaultOutput: {
      userSub: '',
      deliveryMedium: undefined,
    },
  });

export default dtoToSignUp;
