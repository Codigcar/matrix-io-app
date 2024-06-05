//
//  RNZendeskChatModule.swift
//  matrix
//
//  Created by T36437 on 7/09/23.
//

import Foundation
import ChatSDK
import ChatProvidersSDK
import MessagingSDK

@objc(RNZendeskChatModule)
class RNZendeskChatModule: RCTEventEmitter{
  
  @objc
  func initChat(_ key:String){
    Chat.initialize(accountKey: key)
  }
  
  @objc
  func configVisitor(_ options:NSDictionary){
    let chatAPIConfiguration = ChatAPIConfiguration()
    var name = ""
    if(options["name"] as! String != ""){
      name = options["name"] as! String
    }
    var email = ""
    if(options["email"] as! String != ""){
      email = options["email"] as! String
    }
    var phone = ""
    if(options["phone"] as! String != ""){
      phone = options["phone"] as! String
    }
    chatAPIConfiguration.visitorInfo = VisitorInfo(name: name, email: email, phoneNumber: phone)
    Chat.instance?.configuration = chatAPIConfiguration
    
  }
  
  @objc
  func startChat(_ options:NSDictionary){
    DispatchQueue.main.async {
      let messagingConfiguration = self.messagingConfiguration(botName: options["botName"] as! String)
      let chatConfiguration = self.chatConfiguration()
      
      self.startObserver()
      self.showChat(chatConfiguration: chatConfiguration, messagingConfiguration: messagingConfiguration, buttonTitle: options["buttonTitle"] as! String)
    }
  }
  
  @objc
  override static func requiresMainQueueSetup() ->Bool{
    return true;
  }
  
  @objc
  override func constantsToExport() -> [AnyHashable: Any]!{
    return [:];
  }
  
  override func supportedEvents() -> [String]! {
    return ["onCall"]
  }
  
  private func modalBackButton(title: String) -> UIBarButtonItem {
    UIBarButtonItem(title: title == "" ? "Atrás" : title, style: UIBarButtonItem.Style.plain, target: self, action: #selector(dismissViewController))
  }
  
  @objc private func dismissViewController() {
    if var topController = UIApplication.shared.keyWindow?.rootViewController {
      while let presentedViewController = topController.presentedViewController {
          topController = presentedViewController
      }
      topController.dismiss(animated: true)
    }
  }
  
  var token: ChatProvidersSDK.ObservationToken?
  
  func startObserver() {
    token = Chat.chatProvider?.observeChatState { (chatState) in
      if (chatState.chatSessionStatus == .started) {
        self.sendEvent(withName: "onCall", body: ["status": "CHATTING"])
      }
      if (chatState.chatSessionStatus == .ended) {
        
      }
    }
  }
  
  func cancelObserver() {
      token?.cancel()
  }
  
  func chatConfiguration() -> ChatConfiguration {
    let formConfiguration = ChatFormConfiguration(name: .hidden,
                                                  email: .hidden,
                                                  phoneNumber: .hidden,
                                                  department: .required)
    
    let chatConfiguration = ChatConfiguration()
    chatConfiguration.isAgentAvailabilityEnabled = true
    chatConfiguration.isOfflineFormEnabled = true
    chatConfiguration.isPreChatFormEnabled = true
    chatConfiguration.isChatTranscriptPromptEnabled = false
  
    chatConfiguration.chatMenuActions = [.endChat]
    
    chatConfiguration.preChatFormConfiguration = formConfiguration
    
    return chatConfiguration
  }
  
  func messagingConfiguration(botName: String) -> MessagingConfiguration {
    let messagingConfiguration = MessagingConfiguration()
    messagingConfiguration.name = botName
    
    return messagingConfiguration
  }
  
  func showChat(chatConfiguration: ChatConfiguration, messagingConfiguration: MessagingConfiguration, buttonTitle: String) {
    do {
      let chatEngine = try ChatEngine.engine()
      let viewController = try Messaging.instance.buildUI(engines: [chatEngine], configs: [messagingConfiguration, chatConfiguration])

      viewController.navigationItem.leftBarButtonItem = self.modalBackButton(title: buttonTitle)
      let navigationController = UINavigationController(rootViewController: viewController)
      if var topController = UIApplication.shared.keyWindow?.rootViewController {
        while let presentedViewController = topController.presentedViewController {
            topController = presentedViewController
        }
        topController.present(navigationController, animated: true)
      }
    } catch {
        // handle error
    }
  }
  
}
