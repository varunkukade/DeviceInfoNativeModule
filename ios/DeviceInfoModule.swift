//
//  DeviceInfoModule.swift
//  DeviceInfoNativeModulePOC
//
//  Created by Varun Kukade on 07/12/24.
//

import Foundation


@objc(DeviceInfoModule)
class DeviceInfoModule: NSObject {
  
  @objc(requiresMainQueueSetup)
    static func requiresMainQueueSetup() -> Bool {
      return false
    }
  
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return [
      "deviceBrand": "Apple",
      "device": "simulator",
      "deviceModel": "Iphone 16 pro max",
      "deviceManufacturer": "apple",
      "product": "apple product",
      "osName": "IOS os",
      "osVersion": "test version",
      "hardware": "test hardware"
    ]
  }
  
  @objc
  func isBatteryCharging(_ callback: RCTResponseSenderBlock) {
      callback([true])
  }

  @objc
  func isUSBBatteryCharge(_ callback: RCTResponseSenderBlock) {
      callback([true])
  }

  @objc
  func isACBatteryCharge(_ callback: RCTResponseSenderBlock) {
      callback([true])
  }

  @objc
  func getBatteryPercentage(_ callback: RCTResponseSenderBlock) {
    callback([23.4])
  }
  
  @objc
  func isLowMemory(_ callback: RCTResponseSenderBlock) {
      callback([false])
  }
  
  @objc
  func getAvailableMemory(_ callback: RCTResponseSenderBlock) {
      callback(["2.3 GB"])
  }
  
  @objc
  func getTotalMemory(_ callback: RCTResponseSenderBlock) {
      callback(["10 GB"])
  }
  
  @objc
  func getReadableVersion(_ callback: RCTResponseSenderBlock) {
      callback(["1.0.23"])
  }

}
