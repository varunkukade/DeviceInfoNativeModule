package com.deviceinfonativemodulepoc;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.os.BatteryManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.os.Build;
import java.lang.System;
import java.util.HashMap;
import java.util.Map;

public class DeviceInfoModule extends ReactContextBaseJavaModule {
    String NativeModuleName = "DeviceInfoModule";
    String unknown = "unknown";
    int minusOne = -1;

    private final MemoryHelper memoryHelper;
    private final Intent batteryStatus;
    int chargePlug;

    DeviceInfoModule(ReactApplicationContext context) {
        super(context);
        BatteryHelper batteryHelper = new BatteryHelper(context.getApplicationContext());
        this.batteryStatus = batteryHelper.getBatteryStatus();
        this.chargePlug = this.batteryStatus.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1);
        this.memoryHelper = new MemoryHelper(context.getApplicationContext());
    }

    @Override
    public String getName() {
        return NativeModuleName;
    }

    private PackageInfo getPackageInfo() throws Exception {
        return getReactApplicationContext().getPackageManager().getPackageInfo(getReactApplicationContext().getPackageName(), 0);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("deviceBrand", Build.BRAND);
        constants.put("deviceModel", Build.MODEL);
        constants.put("deviceManufacturer", Build.MANUFACTURER);
        constants.put("device", Build.DEVICE);
        constants.put("hardware", Build.HARDWARE);
        constants.put("product", Build.PRODUCT);
        constants.put("osName", System.getProperty("os.name"));
        constants.put("osVersion", System.getProperty("os.version"));
        return constants;
    }

    @ReactMethod
    public boolean isBatteryCharging() {
        // Are we charging / charged?
        int status = this.batteryStatus.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        return status == BatteryManager.BATTERY_STATUS_CHARGING ||
                status == BatteryManager.BATTERY_STATUS_FULL;
    }

    @ReactMethod
    public boolean isUSBBatteryCharge() {
        // is charging through USB
        return chargePlug == BatteryManager.BATTERY_PLUGGED_USB;
    }

    @ReactMethod
    public boolean isACBatteryCharge() {
        // is charging through AC plug
        return chargePlug == BatteryManager.BATTERY_PLUGGED_AC;
    }

    @ReactMethod
    public float getBatteryPercentage() {
        // battery percentage
        int level = this.batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = this.batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
        return level * 100 / (float)scale;
    }

    @ReactMethod
    public boolean isLowMemory() {
        //verify is device is on low RAM
        return this.memoryHelper.isLowMemory();
    }

    @ReactMethod
    public float getAvailableMemory() {
        // get what RAM is available
        return this.memoryHelper.getAvailableMemory();
    }

    @ReactMethod
    public float getTotalMemory() {
        // get what is total RAM of device
        return this.memoryHelper.getTotalMemory();
    }

    @ReactMethod
    public String getVersionName() throws Exception {
       return getPackageInfo().versionName;
    }

    @ReactMethod
    public int getVersionCode() throws Exception {
        return getPackageInfo().versionCode;
    }

    @ReactMethod
    public String getReadableVersion() {
        try {
            int versionCode = getVersionCode();
            String versionName = getVersionName();
            return versionName + '.' + versionCode;
        } catch (Exception e) {
            // Handle the exception
            System.err.println("An error occurred while fetching readableVersion: " + e.getMessage());
            return unknown;
        }
    }
}
