//
//
// Copyright © 2021-2022 THALES. All rights reserved.
//

#import <Foundation/Foundation.h>

@class D1CUiDelegates;
@class D1CA2AuthorizeRequest;

NS_ASSUME_NONNULL_BEGIN

__attribute__((visibility("default")))
@interface D1CA2Client : NSObject

- (instancetype)init NS_UNAVAILABLE;
- (instancetype _Nullable)initWithBaseUrl:(NSString *)baseUrl issuerId:(NSString *)issuerId error:(NSError **)error;

- (void)login:(NSData *)issuerToken uiDelegates:(D1CUiDelegates *)uiDelegates completion:(void(^)(NSError *_Nullable error))completion;
- (void)authorize:(D1CA2AuthorizeRequest *)authorizeRequest uiDelegates:(D1CUiDelegates *)uiDelegates completion:(void(^)(NSMutableData *_Nullable authorizationToken, NSError *_Nullable error))completion;
- (void)logoutWithCompletion:(void(^)(NSError *_Nullable error))completion;

- (void)wipe;

@end

NS_ASSUME_NONNULL_END
