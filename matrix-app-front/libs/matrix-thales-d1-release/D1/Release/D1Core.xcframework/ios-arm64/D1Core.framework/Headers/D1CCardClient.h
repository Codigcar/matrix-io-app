//
//
// Copyright © 2021-2022 THALES. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "D1CCardEnums.h"
#import "D1CCardActivationMethod.h"

@class D1CCardMetadata;
@class D1CCardPushDetails;
@class D1CVirtualCard;
@class D1CPhysicalCardPin;
@class D1CA2Client;
@class D1CUiDelegates;
@class D1CEntryUI;
@class D1CCardPinUI;
@class D1CCardDetailsUI;

NS_ASSUME_NONNULL_BEGIN

__attribute__((visibility("default")))
@interface D1CCardClient : NSObject
@property NSString *consumerId;
@property NSData *rsaExponent;
@property NSData *rsaModulus;

- (instancetype)init NS_UNAVAILABLE;
- (instancetype _Nullable)initWithBaseUrl:(NSString*)baseUrl
                                 issuerId:(NSString*)issuerId
                                 a2Client:(D1CA2Client*)a2Client
                            a2UiDelegates:(D1CUiDelegates*)a2UiDelegates
                                    error:(NSError **)error;
- (void)virtualCardWithCardId:(NSString*)cardId
                   completion:(void(^)(D1CVirtualCard *_Nullable virtualCard, NSError *_Nullable error))completion;
- (void)displayCardDetailsWithCardId:(NSString*)cardId
                       cardDetailsUi:(D1CCardDetailsUI*)cardDetailsUi
                          completion:(void(^)(NSError *_Nullable error))completion;
- (void)metadataWithCardId:(NSString*)cardId
                completion:(void(^)(D1CCardMetadata *_Nullable cardMetadata, NSError *_Nullable error))completion;
- (void)cardPushDetailsWithCardId:(NSString*)cardId 
                       walletType:(D1CWalletType)walletType
                       completion:(void(^)(D1CCardPushDetails *_Nullable cardPushDetails, NSError *_Nullable error))completion;
- (void)digitalCardAuthCodeWithCardId:(NSString*)cardId
                        digitalCardId:(NSString*)digitalCardId
                           completion:(void(^)(NSMutableData *_Nullable digitalCardAuthCode, NSError *_Nullable error))completion;
- (void)physicalCardPinWithCardId:(NSString*)cardId
                       completion:(void(^)(NSMutableData *_Nullable physicalCardPin, NSError *_Nullable error))completion;
- (void)displayPhysicalCardPinWithCardId:(NSString*)cardId
                               cardPinUi:(D1CCardPinUI *)cardPinUi
                            completion:(void(^)(NSError *_Nullable error))completion;
- (void)setPhysicalCardPinWithCardId:(NSString*)cardId
                             entryUi:(D1CEntryUI *)entryUi
                          completion:(void(^)(NSError *_Nullable error))completion NS_SWIFT_NAME(setPhysicalCardPin(withCardId:entryUi:completion:));
- (void)cardActivationMethodWithCardId:(NSString*)cardId
                                    completion:(void(^)(D1CCardActivationMethod activationMethod, NSError *_Nullable error))completion;
- (void)activatePhysicalCardWithCardId:(NSString*)cardId
                               entryUi:(D1CEntryUI *)entryUi
                            completion:(void(^)(NSError *_Nullable error))completion;

@end

NS_ASSUME_NONNULL_END
