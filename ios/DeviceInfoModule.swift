//
//  DeviceInfoModule.swift
//  DeviceInfoNativeModulePOC
//
//  Created by Varun Kukade on 07/12/24.
//

import Foundation
import DeviceKit


@objc(DeviceInfoModule)
class DeviceInfoModule: NSObject {
  
  let device = Device.current
  
  @objc(requiresMainQueueSetup)
    static func requiresMainQueueSetup() -> Bool {
      return false
    }
  
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return [
      "deviceBrand": "Apple",
      "device": device.safeDescription,
      "deviceModel": device.model ?? "NA",
      "deviceManufacturer": "Apple",
      "product": device.isSimulator ? "Simulator" : device.isPad ? "iPad" : device.isPhone ? "iPhone" : "Unknown",
      "osName": device.systemName ?? "NA",
      "osVersion": device.systemVersion ?? "NA",
      "hardware": device.cpu.description
    ]
  }
  
  @objc
  func isBatteryCharging(_ callback: RCTResponseSenderBlock) {
    let batteryState = device.batteryState;
    if let batteryState {
      let isBatteryCharging = batteryState == .full || batteryState >= .charging(0);
        callback([isBatteryCharging])
    } else {
        print("The batteryState was nil")
      callback([false])
    }
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
    let batteryPercent = device.batteryLevel
    callback([batteryPercent])
  }
  
  @objc
  func isLowMemory(_ callback: RCTResponseSenderBlock) {
    if Device.volumeAvailableCapacityForOpportunisticUsage ?? 0 > Int64(1_000_000) {
      callback([false])
    } else if Device.volumeAvailableCapacityForImportantUsage ?? 0 > Int64(1_000) {
      callback([true])
    } else {
      print("IsLowMemory not found")
    }
  }
  
  func bytesToGigabytes(_ bytes: Int) -> String {
      let gigabytes = Double(bytes) / (1024 * 1024 * 1024)
      return String(format: "%.2f", gigabytes) + " GB"
  }
  
  @objc
  func getAvailableMemory(_ callback: RCTResponseSenderBlock) {
    if let availableSpaceinBytes = Device.volumeAvailableCapacity {
        callback([bytesToGigabytes(availableSpaceinBytes)])
    } else {
      callback(["NA"])
    }
  }
  
  @objc
  func getTotalMemory(_ callback: RCTResponseSenderBlock) {
    if let totalSpaceinBytes = Device.volumeTotalCapacity {
        callback([bytesToGigabytes(totalSpaceinBytes)])
    } else {
      callback(["NA"])
    }
  }
  
  @objc
  func getReadableVersion(_ callback: RCTResponseSenderBlock) {
    if var appVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String {
      if let buildNumber = Bundle.main.infoDictionary?["CFBundleVersion"] as? String {
        appVersion += " (\(buildNumber))"
        callback([appVersion])
      } else {
        callback(["NA"])
      }
    } else {
      callback(["NA"])
    }
  }

}
