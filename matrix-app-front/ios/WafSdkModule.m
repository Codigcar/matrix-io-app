//
//  WafSdkModule.m
//  matrix
//
//  Created by Juan Sebastian Pena Olave on 16/03/23.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(WafSdkModule, NSObject)


//RCT_EXTERN_METHOD(getToken:(NSString *)applicationIntegrationURL domainName:(NSString *)domainName
//    resolve:(RCTPromiseResolveBlock)resolve
//    reject:(RCTPromiseRejectBlock)reject);


RCT_EXTERN_METHOD(getToken:(NSString *)applicationIntegrationURL domainName:(NSString *)domainName resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)


+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
