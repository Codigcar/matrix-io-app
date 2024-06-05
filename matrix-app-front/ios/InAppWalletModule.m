#import "InAppWalletModule.h"

@implementation InAppWalletModule

RCT_EXPORT_MODULE();

- (void)sendEventToReactNative:(NSString *)eventName withBody:(NSDictionary *)eventData {
  [self sendEventWithName:eventName body:eventData];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"CARD_ACTIVATION"];
}


RCT_EXPORT_METHOD(sendResultToWalletApp:(NSString *)status) {
    NSLog(@"Received status from RN: %@", status);
}

@end


