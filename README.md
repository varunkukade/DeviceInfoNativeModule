# POC: Device Info Native Module
A native module for React Native that provides comprehensive device information and battery status.

## Version
- React Native = 0.72.4

## Features
- Battery status monitoring
- Memory usage information
- Device specifications
- Operating system details

## Available Properties
| Property | Type | Description |
|----------|------|-------------|
| `isBatteryCharging` | `boolean` | Indicates if device is currently charging |
| `isACBatteryCharge` | `boolean` | True if charging via AC adapter (Android only) |
| `isUSBBatteryCharge` | `boolean` | True if charging via USB (Android only) |
| `batteryPercentage` | `number` | Current battery level (0-100) |
| `isLowMemory` | `boolean` | Android: RAM status, iOS: Storage status |
| `availableMemory` | `string` | Android: Available RAM, iOS: Available Storage |
| `totalMemory` | `string` | Android: Total RAM, iOS: Total Storage |
| `appVersion` | `string` | Current application version |
| `deviceBrand` | `string` | Brand name of the device |
| `device` | `string` | Device name |
| `deviceModel` | `string` | Model name of the device |
| `deviceManufacturer` | `string` | Device manufacturer |
| `product` | `string` | Product name |
| `osName` | `string` | Operating system name |
| `osVersion` | `string` | Operating system version |
| `hardware` | `string` | Hardware information |

## License
MIT
