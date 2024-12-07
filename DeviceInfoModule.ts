import {NativeModules, Platform} from 'react-native';

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

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

type TDeviceInfo = {
  isBatteryCharging: (callback: (value: boolean) => void) => boolean;
  isUSBBatteryCharge: (callback: (value: boolean) => void) => boolean;
  isACBatteryCharge: (callback: (value: boolean) => void) => boolean;
  isLowMemory: (callback: (value: boolean) => void) => boolean;
  getBatteryPercentage: (callback: (value: number) => void) => number;
  getAvailableMemory: (callback: (value: string) => void) => string;
  getTotalMemory: (callback: (value: string) => void) => string;
  getReadableVersion: (callback: (value: string) => void) => string;
  getConstants: () => DeviceInfoConstants;
  deviceBrand: string;
  device: string;
  deviceModel: string;
  deviceManufacturer: string;
  product: string;
  osName: string;
  osVersion: string;
  hardware: string;
};

const DeviceInfoNativeModule = NativeModules.DeviceInfoModule as TDeviceInfo;

const {
  deviceBrand,
  device,
  deviceModel,
  deviceManufacturer,
  product,
  osName,
  osVersion,
  hardware,
} = DeviceInfoNativeModule.getConstants();

const {
  isBatteryCharging,
  isACBatteryCharge,
  isUSBBatteryCharge,
  getBatteryPercentage,
  isLowMemory,
  getAvailableMemory,
  getTotalMemory,
  getReadableVersion,
} = DeviceInfoNativeModule;

export const fetchIsDeviceCharging = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid || isIOS) {
        isBatteryCharging(value => {
          if (value === undefined) {
            reject(
              new Error('Failed to get battery charging status on Android'),
            );
          } else {
            resolve(value);
          }
        });
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while checking battery charging status:', error);
      reject(error);
    }
  });
};

export const fetchIsACBatteryCharge = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid || isIOS) {
        isACBatteryCharge(value => {
          if (value === undefined) {
            reject(
              new Error('Failed to get AC battery charging status on Android'),
            );
          } else {
            resolve(value);
          }
        });
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while checking AC battery charging status:', error);
      reject(error);
    }
  });
};

export const fetchIsUSBBatteryCharge = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid || isIOS) {
        isUSBBatteryCharge(value => {
          if (value === undefined) {
            reject(
              new Error('Failed to get USB battery charging status on Android'),
            );
          } else {
            resolve(value);
          }
        });
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while checking USB battery charging status:', error);
      reject(error);
    }
  });
};

export const fetchBatteryPercentage = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid || isIOS) {
        getBatteryPercentage(value => {
          if (value === undefined) {
            reject(new Error('Failed to get battery percentage on Android'));
          } else {
            resolve(value);
          }
        });
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while getting battery percentage:', error);
      reject(error);
    }
  });
};

export const fetchIsLowMemory = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid || isIOS) {
        isLowMemory(value => {
          if (value === undefined) {
            reject(
              new Error(
                'Failed to check if the device has low memory on Android',
              ),
            );
          } else {
            resolve(value);
          }
        });
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while checking low memory status:', error);
      reject(error);
    }
  });
};

export const fetchAvailableMemory = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid || isIOS) {
        getAvailableMemory(value => {
          if (value === undefined) {
            reject(new Error('Failed to get available memory on Android'));
          } else {
            resolve(value);
          }
        });
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while getting available memory:', error);
      reject(error);
    }
  });
};

export const fetchTotalMemory = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid || isIOS) {
        getTotalMemory(value => {
          if (value === undefined) {
            reject(new Error('Failed to get total memory on Android'));
          } else {
            resolve(value);
          }
        });
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while getting total memory:', error);
      reject(error);
    }
  });
};

export const fetchAppVersion = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid || isIOS) {
        getReadableVersion(value => {
          if (value === undefined) {
            reject(new Error('Failed to get app version on Android'));
          } else {
            resolve(value);
          }
        });
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while getting app version:', error);
      reject(error);
    }
  });
};

export const fetchDeviceBrand = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid) {
        resolve(deviceBrand);
      } else if (isIOS) {
        if (DeviceInfoNativeModule.deviceBrand !== undefined) {
          resolve(DeviceInfoNativeModule.deviceBrand);
        } else {
          reject(new Error('Failed to get device brand on iOS'));
        }
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while getting device brand:', error);
      reject(error);
    }
  });
};

export const fetchDeviceModel = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid) {
        resolve(deviceModel);
      } else if (isIOS) {
        if (DeviceInfoNativeModule.deviceModel !== undefined) {
          resolve(DeviceInfoNativeModule.deviceModel);
        } else {
          reject(new Error('Failed to get device model on iOS'));
        }
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while getting device model:', error);
      reject(error);
    }
  });
};

export const fetchDeviceManufacturer = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid) {
        resolve(deviceManufacturer);
      } else if (isIOS) {
        if (DeviceInfoNativeModule.deviceManufacturer !== undefined) {
          resolve(DeviceInfoNativeModule.deviceManufacturer);
        } else {
          reject(new Error('Failed to get device manufacturer on iOS'));
        }
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while getting device manufacturer:', error);
      reject(error);
    }
  });
};

export const fetchDevice = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid) {
        resolve(device);
      } else if (isIOS) {
        if (DeviceInfoNativeModule.device !== undefined) {
          resolve(DeviceInfoNativeModule.device);
        } else {
          reject(new Error('Failed to get device name on iOS'));
        }
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while getting device name:', error);
      reject(error);
    }
  });
};

export const fetchHardware = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid) {
        resolve(hardware);
      } else if (isIOS) {
        if (DeviceInfoNativeModule.hardware !== undefined) {
          resolve(DeviceInfoNativeModule.hardware);
        } else {
          reject(new Error('Failed to get hardware information on iOS'));
        }
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while getting hardware information:', error);
      reject(error);
    }
  });
};

export const fetchProduct = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid) {
        resolve(product);
      } else if (isIOS) {
        if (DeviceInfoNativeModule.product !== undefined) {
          resolve(DeviceInfoNativeModule.product);
        } else {
          reject(new Error('Failed to get product name on iOS'));
        }
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while getting product name:', error);
      reject(error);
    }
  });
};

export const fetchOsName = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid) {
        resolve(osName);
      } else if (isIOS) {
        if (DeviceInfoNativeModule.osName !== undefined) {
          resolve(DeviceInfoNativeModule.osName);
        } else {
          reject(new Error('Failed to get OS name on iOS'));
        }
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while getting OS name:', error);
      reject(error);
    }
  });
};

export const fetchOsVersion = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (isAndroid) {
        resolve(osVersion);
      } else if (isIOS) {
        if (DeviceInfoNativeModule.osVersion !== undefined) {
          resolve(DeviceInfoNativeModule.osVersion);
        } else {
          reject(new Error('Failed to get OS version on iOS'));
        }
      } else {
        reject(new Error('Device platform is not supported'));
      }
    } catch (error) {
      console.error('Error while getting OS version:', error);
      reject(error);
    }
  });
};
