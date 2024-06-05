import { IRNShareOptions } from 'src/core/libraries-implementation/react-native-share/react-native-share.interface';

export interface IShareRepository {
  shareOptions(options: IRNShareOptions): Promise<void>;
}
