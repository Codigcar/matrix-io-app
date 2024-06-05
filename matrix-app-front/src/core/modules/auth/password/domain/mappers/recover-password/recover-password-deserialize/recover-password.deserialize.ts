import { deserialize } from 'src/core/helpers/transform';
import {
  RecoverPasswordDto,
  RecoverPasswordSchema,
} from '../../../../dtos/recover-password/recover-password.dto';
import IRecoverPassword from '../../../../dtos/recover-password/recover-password.interface';

const dtoToRecoverPassword = (dto: RecoverPasswordDto): IRecoverPassword => deserialize(dto, {
  outputSchema: RecoverPasswordSchema,
  serializationLogic: (validatedDto) => ({
    deliveryMedium: validatedDto?.CodeDeliveryDetails?.DeliveryMedium || '',
  }),
  defaultOutput: {
    deliveryMedium: '',
  },
});

export default dtoToRecoverPassword;
