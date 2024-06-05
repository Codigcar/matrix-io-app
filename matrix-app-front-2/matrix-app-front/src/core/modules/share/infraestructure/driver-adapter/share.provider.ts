import RNShareImplementation from 'src/core/libraries-implementation/react-native-share/react-native-share.implementation';
import { IShareRepository } from 'src/core/modules/share/repository/share.repository';
import { IRNShareOptions } from 'src/core/libraries-implementation/contracts/react-native-share.interface';

class ShareProvider implements IShareRepository {
  private rnShare: RNShareImplementation;

  constructor(
    rnShareImpInstance = new RNShareImplementation(),
  ) {
    this.rnShare = rnShareImpInstance;
  }

  public async shareOptions(options: IRNShareOptions): Promise<void> {
    return this.rnShare.open(options);
  }
}

export default ShareProvider;
