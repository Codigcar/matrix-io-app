declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL: string;
    CARD_BASE_URL: string;
    DOCUMENTS_BASE_URL: string;
    API_KEY: string;
    AWS_PINPOINT_APPLICATION_ID: string;
    API_KEY_CULQUI: string;
    API_CULQUI: string;
    API_KEY_ZENDESK: string;
    APPLICATION_ID: string;
    REQUIRE_WAF_TOKEN: string;
    GCP_RECAPTCHA_V3_KEY_ID: string;
    GCP_RECAPTCHA_V2_KEY_ID: string;
    GCP_RECAPTCHA_DOMAIN_NAME: string;
    PASSWORD_PUBLIC_KEY: string;
    APPSFLYER_HOST: string;
    APPLE_ID: string;
    APPSFLYER_KEY: string;
    WEB_POOL_ID: string;
    APP_ENVIRONMENT: string;
    AUTH_BASE_URL: string;
    AWS_REGION: string;
    POOL_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
