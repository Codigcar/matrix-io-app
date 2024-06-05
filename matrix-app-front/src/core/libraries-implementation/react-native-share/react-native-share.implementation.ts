import Share from 'react-native-share';

import { IRNShare, IRNShareOptions } from './react-native-share.interface';

export default class RNShareImplementation implements IRNShare {
  public async open(options: IRNShareOptions): Promise<void> {
    await Share.open(options);
  }
}
