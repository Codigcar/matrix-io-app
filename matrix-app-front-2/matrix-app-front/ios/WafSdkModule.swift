//
//  WafSdkModule.swift
//  matrix
//
//  Created by Juan Sebastian Pena Olave on 16/03/23.
//

 import Foundation
 import WafMobileSdk

 @objc (WafSdkModule)
 class WafSdkModule: NSObject{
  
   @objc
   func getToken(_ applicationIntegrationURL: String, domainName: String ,  resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
     
     let url: URL = URL(string: applicationIntegrationURL)!
     let configuration = WAFConfiguration(applicationIntegrationUrl: url, domainName: domainName, backgroundRefreshEnabled: false, setTokenCookie: true)
     
  
     let tokenProvider = WAFTokenProvider(configuration!)
     let tokenRequest = tokenProvider.getToken()
    
     
     if( tokenRequest != nil) {
       resolve(tokenRequest?.value)
       return
     }
     
     
     reject("01","token not found",nil)
     
     
   }
 }


