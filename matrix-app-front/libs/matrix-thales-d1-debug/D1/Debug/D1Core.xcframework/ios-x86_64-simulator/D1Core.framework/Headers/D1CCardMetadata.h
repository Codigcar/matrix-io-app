//
//
// Copyright © 2021-2022 THALES. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <D1Core/D1CCardEnums.h>

@class D1CCardAsset;

NS_ASSUME_NONNULL_BEGIN

@interface D1CCardMetadata : NSObject

@property NSString *cardLast4;
@property NSString *cardExpiry;
@property D1CCardScheme cardScheme;
@property D1CCardState cardState;
@property NSArray<D1CCardAsset *> *cardAssetArray;
@property NSArray<NSString*> *cardArtManifest;

- (instancetype)initWithScheme:(D1CCardScheme)scheme
                         last4:(NSString*)last4
                        expiry:(NSString*)expiry
                         state:(D1CCardState)state
                     cardAsset:(NSArray<D1CCardAsset*>* _Nullable)cardAssetArray;


@end

NS_ASSUME_NONNULL_END
