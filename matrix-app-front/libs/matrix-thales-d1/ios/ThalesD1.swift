import D1
import SwiftJWT
import PassKit

@objc(ThalesD1)
class ThalesD1: NSObject {

    @objc public func configure(
        d1ServiceURLString: String,
        issuerID: String,
        d1ServiceRSAExponent: String,
        d1ServiceRSAModulus: String,
        digitalCardURLString: String,
        consumerId: String,
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        var components = D1Task.Components()
        components.d1ServiceURLString = d1ServiceURLString
        components.issuerID = issuerID
        components.d1ServiceRSAExponent = Data(bytes: d1ServiceRSAExponent.utf8)
        components.d1ServiceRSAModulus = Data(bytes: d1ServiceRSAModulus.utf8)
        components.digitalCardURLString = digitalCardURLString

        D1Helper.shared().configure(consumerId: consumerId, components: components) { (error: [D1Error]?) in
            if let error = error {
                if self.isError(error: error[0]) {
                    let errorDetail = self.parseError(error: error[0])
                    reject(errorDetail["code"], errorDetail["message"], nil)
                    return
                }
            }

            resolve(true)
        }
    }

  @objc func getTestToken(
    accessToken: String, _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    // Your can use JWTEncoder.generateCustomBAn from Example for testing.
    let accessToken = ""
      
    return resolve(accessToken)

  }

  @objc func login(
    accessToken: String, resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    D1Helper.shared().login(accessToken: accessToken) { (error: D1Error?) in
      if self.isError(error: error) {
        let errorDetail = self.parseError(error: error)
        reject(errorDetail["code"], errorDetail["message"], nil)
        return
      }

      resolve(true)
    }

  }

  @objc
  func getCardDetails(
    cardId: String, resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {

    D1Helper.shared().getCardDetails(cardId: cardId) {
      (cardDetails: CardDetails?, error: D1Error?) in

      if self.isError(error: error) {
        let errorDetail = self.parseError(error: error)
        reject(errorDetail["code"], errorDetail["message"], nil)
        return
      }

      resolve(cardDetails)
    }

  }

  @objc
  func getDigitalCardList(
    _ cardId: String, resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {

    D1Helper.shared().getDigitalCardList(cardId: cardId) {
      (digitalCard: [DigitalCard]?, error: D1Error?) in

      if self.isError(error: error) {
        let errorDetail = self.parseError(error: error)
        reject(errorDetail["code"], errorDetail["message"], nil)
        return
      }

      resolve(digitalCard)
    }

  }

  @objc
  func getCardMetadata(
    _ cardId: String, resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {

    D1Helper.shared().getCardMetadata(cardId: cardId) {
      (cardMetadata: CardMetadata?, error: D1Error?) in
      //print("CARD STATES",CardDigitizationState.digitized ,  CardDigitizationState.pendingIDVLocal , CardDigitizationState.pendingIDVRemote)
      if self.isError(error: error) {
        let errorDetail = self.parseError(error: error)
        reject(errorDetail["code"], errorDetail["message"], nil)
        return
      }

      var card = [
        "pan": "**** **** **** " + (cardMetadata?.cardLast4 ?? ""),
        "panMasked": "xxx",
        "expr": cardMetadata?.cardExpiry.value,
        "name": "****",
        "cvv": "****",
        "cardState": cardMetadata?.cardState.rawValue,
      ]

      resolve(card)

    }
  }

  @objc
  func getDigitizationState(
    _ cardId: String, resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {

    D1Helper.shared().getDigitizationState(cardId: cardId) {
      (cardDigitalizationResult: CardDigitizationResult?, error: D1Error?) in

      if self.isError(error: error) {
        let errorDetail = self.parseError(error: error)
        reject(errorDetail["code"], errorDetail["message"], nil)
        return
      }

      resolve(cardDigitalizationResult)
    }

  }

  @objc
  public func digitizeCard(
    _ cardId: String, resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {

    D1Helper.shared().digitizeCard(cardid: cardId) { (error: D1Error?) in
      if self.isError(error: error) {
        let errorDetail = self.parseError(error: error)
        reject(errorDetail["code"], errorDetail["message"], nil)
        return
      }

      resolve(true)
    }
  }
    @objc
      func isWalletInstalled(resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
          if PKPassLibrary.isPassLibraryAvailable() {
              resolver(true)
          } else {
              resolver(false)
          }
      }
    
    @objc
    public func activateDigitalCard(
      _ cardId: String, resolve: @escaping RCTPromiseResolveBlock,
      reject: @escaping RCTPromiseRejectBlock
    ) {
        D1Helper.shared().activateDigitalCard(cardId: cardId) { (error: D1Error?) in

        if self.isError(error: error) {
          let errorDetail = self.parseError(error: error)
          reject(errorDetail["code"], errorDetail["message"], nil)
          return
        }

        resolve(true)
      }
    }

  @objc
  public func suspedCard(
    _ cardId: String, resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    D1Helper.shared().suspedCard(cardId: cardId) { (error: D1Error?) in

      if self.isError(error: error) {
        let errorDetail = self.parseError(error: error)
        reject(errorDetail["code"], errorDetail["message"], nil)
        return
      }

      resolve(true)
    }
  }

  @objc
  public func resumeCard(
    _ cardId: String, resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    D1Helper.shared().resumeCard(cardId: cardId) { (error: D1Error?) in

      if self.isError(error: error) {
        let errorDetail = self.parseError(error: error)
        reject(errorDetail["code"], errorDetail["message"], nil)
        return
      }

      resolve(true)
    }
  }

  @objc
  public func deleteCard(
    _ cardId: String, resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    D1Helper.shared().deleteCard(cardId: cardId) { (error: D1Error?) in

      if self.isError(error: error) {
        let errorDetail = self.parseError(error: error)
        reject(errorDetail["code"], errorDetail["message"], nil)
        return
      }

      resolve(true)
    }
  }

  @objc
  public func getLibVersions() -> String {
    return D1Task.getSDKVersions().description
  }

  @objc
  func logout(
    _ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    D1Helper.shared().logout { (error: D1Error?) in
      if self.isError(error: error) {
        let errorDetail = self.parseError(error: error)
        reject(errorDetail["code"], errorDetail["message"], nil)
        return
      }

      resolve(true)
    }

  }

  func parseError(error: D1Error?) -> [String: String] {

    var errorDetail = [
      "code": String(describing: error!.code),
      "message": error!.localizedDescription,

    ]

    return errorDetail
  }

  public func isError(error: D1Error?) -> Bool {

    if error != nil {
      return true
    }

    return false
  }

}
