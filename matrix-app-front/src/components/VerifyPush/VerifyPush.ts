import TwilioVerify, {
  PushFactorPayload,
  VerifyPushFactorPayload,
} from '@twilio/twilio-verify-for-react-native';
import VerifyPushServices from 'src/api/VerifyPushServices';
import { CODE_NEW_FACTOR } from './constants';

export enum Flows {
  CONTRACT_OFFER_FLOW = 'contract-offer-flow',
  UPDATE_ATTRIBUTES = 'update-attributes'
}
class VerifyPush {
  deviceToken: string;

  constructor(deviceToken: string) {
    this.deviceToken = deviceToken;
  }

  createFactor = async (flow:Flows, forceFactorCreation?: boolean): Promise<undefined | object> => {
    try {
      const verifyPushTokenResponse = await VerifyPushServices.getVerifyPushToken();
      const {
        message: { metadata, code },
      } = verifyPushTokenResponse;
      const factors = await TwilioVerify.getAllFactors();
      const factor = factors.find((f) => f.sid === metadata?.factorSid);
      if (!factor || code === CODE_NEW_FACTOR || forceFactorCreation) {
        const newFactor = await TwilioVerify.createFactor(
          new PushFactorPayload(
            `${metadata?.identity}/${flow}`,
            metadata?.service,
            metadata?.identity,
            metadata?.token,
            this.deviceToken || null,
          ),
        );
        return new Promise((res) => {
          setTimeout(async () => {
            res(TwilioVerify.verifyFactor(
              new VerifyPushFactorPayload(newFactor.sid),
            ));
          }, 1200);
        });
      }
      return factor;
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };
}

export default VerifyPush;
