//
//  DeviceInfoModule.m
//  DeviceInfoNativeModulePOC
//
//  Created by Varun Kukade on 07/12/24.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(DeviceInfoModule, NSObject)

RCT_EXTERN_METHOD(isBatteryCharging: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isUSBBatteryCharge: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isACBatteryCharge: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getBatteryPercentage: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isLowMemory: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getAvailableMemory: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getTotalMemory: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getReadableVersion: (RCTResponseSenderBlock)callback)

@end
