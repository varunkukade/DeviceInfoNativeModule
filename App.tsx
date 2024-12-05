import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, StyleSheet, View} from 'react-native';

import DeviceInfoModule from './DeviceInfoModule';
import LinearGradient from 'react-native-linear-gradient';

type TDeviceInfo = {
  isBatteryCharging: boolean;
  isACBatteryCharge: boolean;
  isUSBBatteryCharge: boolean;
  batteryPercentage: number;
  isLowMemory: boolean;
  availableMemory: string;
  totalMemory: string;
  appVersion: string;
};

function App(): JSX.Element {
  const [deviceInfo, setDeviceInfo] = useState<TDeviceInfo | null>(null);

  const {
    deviceBrand,
    device,
    deviceModel,
    deviceManufacturer,
    product,
    osName,
    osVersion,
    hardware,
  } = DeviceInfoModule.getConstants();

  useEffect(() => {
    setDeviceInfo({
      isBatteryCharging: DeviceInfoModule.isBatteryCharging(),
      isACBatteryCharge: DeviceInfoModule.isACBatteryCharge(),
      isUSBBatteryCharge: DeviceInfoModule.isUSBBatteryCharge(),
      batteryPercentage: DeviceInfoModule.getBatteryPercentage(),
      isLowMemory: DeviceInfoModule.isLowMemory(),
      availableMemory: DeviceInfoModule.getAvailableMemory(),
      totalMemory: DeviceInfoModule.getTotalMemory(),
      appVersion: DeviceInfoModule.getReadableVersion(),
    });
  }, [])

  // Helper function to render info rows with gradient effect
  const renderInfoRow = (label, value) => (
    <View style={styles.infoRowContainer}>
      <LinearGradient
        colors={['#e9ecef', '#f8f9fa']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.infoRowGradient}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </LinearGradient>
    </View>
  );

  // Render a section with a custom title
  const renderSection = (title, children) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionTitleUnderline} />
      </View>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={['#3498db', '#2980b9']}
          style={styles.headerGradient}>
          <Text style={styles.headerTitle}>Device Details</Text>
        </LinearGradient>

        <View style={styles.contentContainer}>
          {renderSection(
            'Device Information',
            <>
              {renderInfoRow('Brand', deviceBrand)}
              {renderInfoRow('Device', device)}
              {renderInfoRow('Model', deviceModel)}
              {renderInfoRow('Manufacturer', deviceManufacturer)}
              {renderInfoRow('Product', product)}
            </>,
          )}

          {renderSection(
            'System Details',
            <>
              {renderInfoRow('OS Name', osName)}
              {renderInfoRow('OS Version', osVersion)}
              {renderInfoRow('Hardware', hardware)}
            </>,
          )}

          {renderSection(
            'Battery Status',
            <>
              {renderInfoRow('Percentage', `${deviceInfo?.batteryPercentage}%`)}
              {renderInfoRow(
                'Charging',
                deviceInfo?.isBatteryCharging ? 'Active' : 'Inactive',
              )}
              {renderInfoRow(
                'AC Charge',
                deviceInfo?.isACBatteryCharge ? 'Connected' : 'Disconnected',
              )}
              {renderInfoRow(
                'USB Charge',
                deviceInfo?.isUSBBatteryCharge ? 'Connected' : 'Disconnected',
              )}
            </>,
          )}

          {renderSection(
            'Memory Insights',
            <>
              {renderInfoRow(
                'Memory Status',
                deviceInfo?.isLowMemory ? 'Low Memory' : 'Sufficient',
              )}
              {renderInfoRow('Available', deviceInfo?.availableMemory)}
              {renderInfoRow('Total', deviceInfo?.totalMemory)}
            </>,
          )}

          {renderSection(
            'Application',
            <>{renderInfoRow('Version', deviceInfo?.appVersion)}</>,
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  sectionTitleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 5,
  },
  sectionTitleUnderline: {
    height: 3,
    width: 50,
    backgroundColor: '#3498db',
    borderRadius: 2,
  },
  infoRowContainer: {
    paddingHorizontal: 0,
  },
  infoRowGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '600',
    width: '40%',
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    width: '60%',
    textAlign: 'right',
  },
});

export default App;
