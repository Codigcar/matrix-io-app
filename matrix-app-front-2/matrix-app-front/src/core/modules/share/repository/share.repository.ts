import { IRNShareOptions } from 'src/core/libraries-implementation/contracts/react-native-share.interface';

export interface IShareRepository {
  shareOptions(options: IRNShareOptions): Promise<void>;
}
