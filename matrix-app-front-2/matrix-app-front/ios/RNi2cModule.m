//
//  MPSDKEventEmitter.m
//  matrix
//
//  Created by Josue on 23/01/23.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RNi2cModule, RCTEventEmitter)
RCT_EXTERN_METHOD(startTask:(NSString *)appId apiKey:(NSString *)apiKey authToken:(NSString *)authToken cardRefNo:(NSString *)cardRefNo typeTask:(NSString *)typeTask);
RCT_EXTERN_METHOD(finishTask);
+ (BOOL) requiresMainQueueSetup {
  return YES;
}

@end


