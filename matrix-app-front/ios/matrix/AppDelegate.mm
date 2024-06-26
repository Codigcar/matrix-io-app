#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>

#import <RNAppsFlyer.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
#import <PassKit/PassKit.h>
#import "InAppWalletModule.h"
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"matrix";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  // Define UNUserNotificationCenter
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  
  [FIRApp configure];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// Deep linking
// Open URI-scheme for iOS 9 and above
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary *) options {
  [[AppsFlyerAttribution shared] handleOpenUrl:url options:options];
    return YES;
}
// Open URI-scheme for iOS 8 and below
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString*)sourceApplication annotation:(id)annotation {
  [[AppsFlyerAttribution shared] handleOpenUrl:url sourceApplication:sourceApplication annotation:annotation];
  return YES;
}
// Open Universal Links
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler {
    [[AppsFlyerAttribution shared] continueUserActivity:userActivity restorationHandler:restorationHandler];
    return YES;
}
  
// START NOTIFICATIONS
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:notification.request.content.userInfo];
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}

//END NOTIFICATIONS

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

- (RCTBridge *)getRCTBridge {
  UIWindow *window = [UIApplication sharedApplication].delegate.window;
  UIView *rootView = window.rootViewController.view;
  while (rootView && ![rootView isKindOfClass:[RCTRootView class]]) {
    rootView = rootView.subviews.firstObject;
  }
  return [(RCTRootView *)rootView bridge];
}

- (void)sendEventFromApplePay:(NSString *)eventName withData:(NSDictionary *)eventData {
    RCTBridge *bridge = [self getRCTBridge];
    InAppWalletModule *eventEmitter = [bridge moduleForClass:[InAppWalletModule class]];

    if (eventEmitter) {
        [eventEmitter sendEventToReactNative:eventName withBody:eventData];
    }
}

- (BOOL)handleApplePayActivationWithURL:(NSURL *)url {
    NSURLComponents *components = [[NSURLComponents alloc] initWithURL:url resolvingAgainstBaseURL:YES];

    NSArray<NSURLQueryItem *> *queryItems = components.queryItems;
    if (!queryItems) {
        return NO;
    }

    NSString *passTypeIdentifier = nil;
    NSString *serialNumber = nil;
    NSString *action = nil;

    for (NSURLQueryItem *queryItem in queryItems) {
        if ([queryItem.name isEqualToString:@"passTypeIdentifier"]) {
            passTypeIdentifier = queryItem.value;
        } else if ([queryItem.name isEqualToString:@"serialNumber"]) {
            serialNumber = queryItem.value;
        } else if ([queryItem.name isEqualToString:@"action"]) {
            action = queryItem.value;
        }
    }
  
    NSString *eventName = @"CARD_ACTIVATION";
    NSDictionary *eventData;
  
    eventData = @{
        @"primaryAccountNumberSuffix": @"Hello",
        @"deviceAccountIdentifier": @"World"
    };
  
  [self sendEventFromApplePay:eventName withData:eventData];
  
  NSLog(@"Evento enviado");

    if (passTypeIdentifier && serialNumber && action) {
        PKPassLibrary *library = [[PKPassLibrary alloc] init];
        PKPass *pendingPass = [library passWithPassTypeIdentifier:passTypeIdentifier serialNumber:serialNumber];
        if (pendingPass) {
            if (@available(iOS 13.4, *)) {
                PKSecureElementPass *secureElementPass = pendingPass.secureElementPass;
                if (secureElementPass.primaryAccountNumberSuffix && secureElementPass.deviceAccountIdentifier) {
                
                  eventData = @{
                      @"primaryAccountNumberSuffix": secureElementPass.primaryAccountNumberSuffix,
                      @"deviceAccountIdentifier": secureElementPass.deviceAccountIdentifier
                  };
                
                }
            } else {
                PKPaymentPass *paymentPass = pendingPass.paymentPass;
                if (paymentPass.primaryAccountNumberSuffix && paymentPass.deviceAccountIdentifier) {
                   
                  eventData = @{
                      @"primaryAccountNumberSuffix": paymentPass.primaryAccountNumberSuffix,
                      @"deviceAccountIdentifier": paymentPass.deviceAccountIdentifier
                  };
                }
            }
              
            [self sendEventFromApplePay:eventName withData:eventData];
        }
        return YES;
    } else {
     
        return NO;
    }
}

- (BOOL)isApplePayActivationURL:(NSURL *)url {
    NSURLComponents *components = [[NSURLComponents alloc] initWithURL:url resolvingAgainstBaseURL:YES];
    if (!components) {
        return NO;
    }

    NSArray<NSURLQueryItem *> *queryItems = components.queryItems;
    if (!queryItems) {
        return NO;
    }

    BOOL containsPassTypeIdentifier = NO;
    BOOL containsSerialNumber = NO;
    BOOL containsAction = NO;

    for (NSURLQueryItem *item in queryItems) {
        if ([item.name isEqualToString:@"passTypeIdentifier"] && [item.value isEqualToString:@"paymentpass.com.apple"]) {
            containsPassTypeIdentifier = YES;
        } else if ([item.name isEqualToString:@"serialNumber"]) {
            containsSerialNumber = YES;
        } else if ([item.name isEqualToString:@"action"]) {
            containsAction = YES;
        }
    }

    BOOL validated = containsPassTypeIdentifier && containsSerialNumber && containsAction;

    return validated;
}

@end
