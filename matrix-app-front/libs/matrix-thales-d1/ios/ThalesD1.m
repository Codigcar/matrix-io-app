#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ThalesD1, NSObject)

RCT_EXTERN_METHOD(configure:(NSString *)d1ServiceURLString
                  issuerID:(NSString *)issuerID
                  d1ServiceRSAExponent:(NSString *)d1ServiceRSAExponent
                  d1ServiceRSAModulus:(NSString *)d1ServiceRSAModulus
                  digitalCardURLString:(NSString *)digitalCardURLString
                  consumerId:(NSString *)consumerId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(login:(NSString *)accesToken resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(logout: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(isWalletInstalled:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(activateDigitalCard:(NSString *)cardId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(getDigitalCardList:(NSString *)cardId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(getCardMetadata:(NSString *)cardId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(getDigitizationState:(NSString *)cardId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(digitizeCard:(NSString *)cardId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(getLibVersions)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end

