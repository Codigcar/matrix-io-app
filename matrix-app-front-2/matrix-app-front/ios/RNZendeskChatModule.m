//
//  RNZendeskChatModule.m
//  matrix
//
//  Created by T36437 on 7/09/23.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(RNZendeskChatModule, RCTEventEmitter);
RCT_EXTERN_METHOD(initChat:(NSString *)key)
RCT_EXTERN_METHOD(configVisitor:(NSDictionary *)options)
RCT_EXTERN_METHOD(startChat:(NSDictionary *)options)
@end
