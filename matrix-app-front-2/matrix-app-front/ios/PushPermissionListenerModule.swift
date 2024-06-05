//
//  PushPermissionListenerModule.swift
//  matrix
//
//  Created by Neysi Gregorio Tuesta Calderon on 14/11/23.
//

import Foundation
import UserNotifications
import React

@objc(PushPermissionListenerModule)
class PushPermissionListenerModule: RCTEventEmitter {
  let CHECK_INTERVAL_SECONDS = 3
  var timer: Timer?

  override func supportedEvents() -> [String] {
    return ["PermissionStatusChanged"]
  }

  @objc func checkPermissionStatus() {
      UNUserNotificationCenter.current().getNotificationSettings { [weak self] settings in
        let isPermissionGranted = settings.authorizationStatus == .authorized
        self?.sendEvent(withName: "PermissionStatusChanged", body: isPermissionGranted)
      }
  }

  @objc func startPermissionStatusListener() {
    DispatchQueue.main.async {
      self.timer = Timer.scheduledTimer(timeInterval: TimeInterval(self.CHECK_INTERVAL_SECONDS), target: self, selector: #selector(self.checkPermissionStatus), userInfo: nil, repeats: true)
      RunLoop.current.add(self.timer!, forMode: .common)
    }
  }


  @objc func stopPermissionStatusListener() {
    timer?.invalidate()
    timer = nil
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc override func startObserving() {
    startPermissionStatusListener()
  }

  @objc override func stopObserving() {
    stopPermissionStatusListener()
  }
}
