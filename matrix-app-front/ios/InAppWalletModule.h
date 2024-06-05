#import <React/RCTEventEmitter.h>

@interface InAppWalletModule : RCTEventEmitter <RCTBridgeModule>
- (void)sendEventToReactNative:(NSString *)eventName withBody:(NSDictionary *)eventData;
@end

