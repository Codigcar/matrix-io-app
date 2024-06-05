//
//  MPSDKEvenEmitter.swift
//  matrix
//
//  Created by Josue on 23/01/23.
//

import Foundation
import MCPSDK

@objc (RNi2cModule)
class RNi2cModule:RCTEventEmitter, MCPSDKCallBack{

  var params : [String:String] = [:]
  let config = UIConfiguration()
  var ref : MCPSDKTask!
  
   let parentViewController:UIViewController = RCTPresentedViewController()!;
  
  override init() {
    super.init();
    config.hideBackButton = false
    config.hideNavigationbar = false
    config.navBarBGColor = UIColor.white
    config.navBarTextColor = UIColor.white
    config.backgroundColor = UIColor(red: 14/255, green: 16/255, blue: 16/255, alpha: 1)
    config.loadingIndicatorColor = UIColor.white
    config.backBtnImg = UIImage(named: "ic_back_arrow") ?? UIImage()
    config.backBtnTxt = "Custom Back"
    config.loadingOption = .loadOnScreen
    config.localizationOption = .spanish
  
    config.backgroundColor = UIColor(red: 14/255, green: 16/255, blue: 16/255, alpha: 1)
    MCPSDKManager.setUIConfiguration(config)
  }
  
  @objc(startTask:apiKey:authToken:cardRefNo:typeTask:)
    func startTask(_ appId: String, apiKey:String, authToken:String, cardRefNo:String, typeTask:String) -> Void {
     MCPSDKManager.initSDK(appId, apiKey: apiKey)
       params["authToken"] = authToken
       params["cardRefNo"] = cardRefNo
     MCPSDKManager.startTask(typeTask, delegate: self, params: params, parentVC: parentViewController, viewNavigationStyle: .alert, callBack: { (vc ) -> Void in
           self.ref = vc
       })
  }
  
  @objc(finishTask)
    func finishTask() -> Void {
      DispatchQueue.main.async {
        self.ref?.finish()
      }
  }


  override func supportedEvents() -> [String]! {
      return ["onError", "onSuccess","onClosed", "onLoading", "onSuccessTaskChange"]
  }
  
  override func constantsToExport() -> [AnyHashable : Any]! {
     [:]
  }
  
  func onLoadingStarted() -> Bool {
      print("onLoadingStarted")
      sendEvent(withName: "onLoading", body: ["description": "loading"])
      return false
  }

  func onLoadingCompleted() {
      print("OnLoadingCompleted")
      sendEvent(withName: "onSuccess", body: ["description": "success"])
  }


  func onSuccess(responsePayload: [String : String]) {
      print("OnSuccessTaskChange " + responsePayload.description)
      sendEvent(withName: "onSuccessTaskChange", body: ["description": "successTaskChange"])
  }

  func onError(errorCode: String, errorDesc: String) {
      let str1 = "Error Code = " + errorCode
      let str2 = "Error Description = " + errorDesc
      print("OnError : " + str1)
      sendEvent(withName: "onError", body: ["errorCode": str1, "errorDescription": str2])
  }
  
  func onSuccessOTP(responsePayload: [String : String]) {
      print("OTP Verification success ")
  }
  
  func onClosed() {
    print("OnClosed")
    sendEvent(withName: "onClosed", body: ["description": "closed"])
    // ref.finish()
  }
}
