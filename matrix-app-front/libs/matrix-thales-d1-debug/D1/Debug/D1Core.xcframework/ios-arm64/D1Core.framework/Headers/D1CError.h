//
//
// Copyright © 2021-2022 THALES. All rights reserved.
//

#ifndef D1CError_h
#define D1CError_h

__attribute__((visibility("default")))
extern NSString* const D1CErrorDomain;

/**
 Error types.
 */
typedef NS_ERROR_ENUM(D1CErrorDomain, D1CError) {
    /**
     Unknown error.
     */
    D1CErrorUnknownError = 0x01,
    /**
     Failed storage access.
     */
    D1CErrorStorage = 0x02,
    /**
     Failed network access.
     */
    D1CErrorNetwork = 0x03,
    /**
     The user is not logged in or the login validity has expired.
     */
    D1CErrorNotLoggedIn = 0x04,
    /**
     The user is not authorized.
     */
    D1CErrorNotAuthorized = 0x05,
    /**
     The device environment is potentially unsafe.
     */
    D1CErrorDeviceEnvironmentUnsafe = 0x06,
    /**
     There was no card activation method found for this card. Please retrieve the activation method first.
     */
    D1CErrorNoCardActivationMethod = 0x07,
    /**
     The required UI componenet was not found.
     */
    D1CErrorUIComponentNotFound = 0x08
};

#endif /* D1CError_h */
