import { DeliveryOptionsEnum } from 'src/shared/enums/constants.enum';

interface ISignUp {
  userSub: string;
  deliveryMedium?: DeliveryOptionsEnum;
}

export default ISignUp;
