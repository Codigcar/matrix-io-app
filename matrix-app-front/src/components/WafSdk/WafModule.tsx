import { NativeModules } from 'react-native';
import Config from 'react-native-config';

const { AWS_WAF_INTEGRATION_URL, AWS_WAF_DOMAIN_NAME, REQUIRE_WAF_TOKEN } = Config;

class WafModule {
  integrationUrl: string;

  domainName: string;

  requireWafToken: string;

  constructor() {
    this.integrationUrl = AWS_WAF_INTEGRATION_URL;
    this.domainName = AWS_WAF_DOMAIN_NAME;
    this.requireWafToken = REQUIRE_WAF_TOKEN;
  }

  getToken = async (): Promise<any> => {
    const module = NativeModules.WafModule || NativeModules.WafSdkModule;
    if (!this.integrationUrl || !this.domainName) {
      return new Promise((resolve, reject) => {
        reject(new Error('parameters ara empty'));
      });
    }
    if (this.requireWafToken !== 'true') {
      return new Promise((resolve) => {
        resolve(null);
      });
    }

    return module.getToken(this.integrationUrl, this.domainName);
  };
}

export default new WafModule();
