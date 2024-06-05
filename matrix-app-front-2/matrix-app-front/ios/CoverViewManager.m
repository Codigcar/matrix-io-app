//
//  CoverViewManager.m
//  matrix
//
//  Created by Leticia on 13/09/23.
//

#import "CoverViewManager.h"
#import <React/RCTBridge.h>

@implementation CoverViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    CGRect screenBounds = [[UIScreen mainScreen] bounds];
    
    UIView *customView = [[UIView alloc] initWithFrame:screenBounds];
    customView.backgroundColor = [UIColor clearColor];
    
    UIImageView *backgroundImageView = [[UIImageView alloc] initWithFrame:customView.bounds];
    backgroundImageView.image = [UIImage imageNamed:@"AppBackgroundImage"];
    [customView addSubview:backgroundImageView];

    UIImage *logoImage = [UIImage imageNamed:@"AppBackgroundIcon"];
    CGFloat logoWidth = logoImage.size.width;
    CGFloat logoHeight = logoImage.size.height;
    UIImageView *logoImageView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, logoWidth, logoHeight)];
    logoImageView.center = CGPointMake(screenBounds.size.width / 2, screenBounds.size.height / 2);
    logoImageView.image = logoImage;
    [customView addSubview:logoImageView];
    
    return customView;
}

RCT_EXPORT_METHOD(showCoverView) {
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *rootViewController = RCTPresentedViewController();
        UIView *coverView = [rootViewController.view viewWithTag:999];
        
        if (coverView == nil) {
            coverView = [self view];
            coverView.tag = 999;
            [rootViewController.view addSubview:coverView];
        }
    });
  
}

RCT_EXPORT_METHOD(hideCoverView) {
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *rootViewController = RCTPresentedViewController();
        UIView *coverView = [rootViewController.view viewWithTag:999]; 
        
        if (coverView != nil) {
            [coverView removeFromSuperview];
        }
    });
}

@end
