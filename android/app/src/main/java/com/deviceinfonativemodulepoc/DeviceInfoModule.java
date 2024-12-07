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
import com.facebook.react.bridge.Callback;

public class DeviceInfoModule extends ReactContextBaseJavaModule {
    String NativeModuleName = "DeviceInfoModule";
    String unknown = "unknown";

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
    public void isBatteryCharging(Callback callBack) {
        // Are we charging / charged?
        int status = this.batteryStatus.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        callBack.invoke(status == BatteryManager.BATTERY_STATUS_CHARGING ||
                status == BatteryManager.BATTERY_STATUS_FULL);
    }

    @ReactMethod
    public void isUSBBatteryCharge(Callback callBack) {
        // is charging through USB
        callBack.invoke(chargePlug == BatteryManager.BATTERY_PLUGGED_USB);
    }

    @ReactMethod
    public void isACBatteryCharge(Callback callBack) {
        // is charging through AC plug
        callBack.invoke(chargePlug == BatteryManager.BATTERY_PLUGGED_AC);
    }

    @ReactMethod
    public void getBatteryPercentage(Callback callBack) {
        // battery percentage
        int level = this.batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = this.batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
        callBack.invoke(level * 100 / (float)scale);
    }

    @ReactMethod
    public void isLowMemory(Callback callBack) {
        //verify is device is on low RAM
        callBack.invoke(this.memoryHelper.isLowMemory());
    }

    public String formatMemoryInGB(long bytes) {
        double gb = bytes / (1024.0 * 1024.0 * 1024.0);
        return String.format("%.2f GB", gb);
    }

    @ReactMethod
    public void getAvailableMemory(Callback callBack) {
        // get what RAM is available
        callBack.invoke(formatMemoryInGB(this.memoryHelper.getAvailableMemory()));
    }

    @ReactMethod
    public void getTotalMemory(Callback callBack) {
        // get what is total RAM of device
        callBack.invoke(formatMemoryInGB(this.memoryHelper.getTotalMemory()));
    }

    public String getVersionName() throws Exception {
       return getPackageInfo().versionName;
    }

    public int getVersionCode() throws Exception {
        return getPackageInfo().versionCode;
    }

    @ReactMethod
    public void getReadableVersion(Callback callBack) {
        try {
            int versionCode = getVersionCode();
            String versionName = getVersionName();
            callBack.invoke(versionName + '.' + versionCode);
        } catch (Exception e) {
            // Handle the exception
            System.err.println("An error occurred while fetching readableVersion: " + e.getMessage());
            callBack.invoke(unknown);
        }
    }
}
