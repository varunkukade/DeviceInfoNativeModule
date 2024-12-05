import {NativeModules} from 'react-native';

const {DeviceInfoModule} = NativeModules;

type DeviceInfoConstants = {
  deviceBrand: string;
  deviceModel: string;
  deviceManufacturer: string;
  device: string;
  hardware: string;
  product: string;
  osName: string;
  osVersion: string;
};

type TDeviceInfo = {
  isBatteryCharging: () => boolean;
  isUSBBatteryCharge: () => boolean;
  isACBatteryCharge: () => boolean;
  isLowMemory: () => boolean;
  getBatteryPercentage: () => number;
  getAvailableMemory: () => string;
  getTotalMemory: () => string;
  getReadableVersion: () => string;
  getConstants: () => DeviceInfoConstants;
};

export default DeviceInfoModule as TDeviceInfo;
