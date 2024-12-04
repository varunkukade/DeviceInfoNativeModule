package com.deviceinfonativemodulepoc;
import android.content.Context;
import android.content.Intent;
import android.os.BatteryManager;
import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.os.Build;
import java.lang.System;
import android.hardware.display.DeviceProductInfo;

public class DeviceInfoModule extends ReactContextBaseJavaModule {
    private final Context context;

    DeviceInfoModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }


    String tag = "DeviceInfoModule";

    @Override
    public String getName() {
        return "DeviceInfoModule";
    }

    @ReactMethod
    public void getDeviceInfo() {
        Log.d(tag, "getDeviceModel called");
        String brand = Build.BRAND;
        String model = Build.MODEL;
        String manifacturer = Build.MANUFACTURER;
        String versionCode = Build.VERSION.RELEASE;
        int base = Build.VERSION_CODES.BASE;
        String device = Build.DEVICE;
        String hardware = Build.HARDWARE;
        String product = Build.PRODUCT;
        String osName = System.getProperty("os.name");
        String osVersion = System.getProperty("os.version");

        BatteryHelper batteryHelper = new BatteryHelper(context.getApplicationContext());
        Intent batteryStatus = batteryHelper.getBatteryStatus();

        // Are we charging / charged?
        int status = batteryStatus.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        boolean isBatteryCharging = status == BatteryManager.BATTERY_STATUS_CHARGING ||
                status == BatteryManager.BATTERY_STATUS_FULL;

        // How are we charging?
        int chargePlug = batteryStatus.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1);
        boolean isUSBBatteryCharge = chargePlug == BatteryManager.BATTERY_PLUGGED_USB;
        boolean isACBatteryCharge = chargePlug == BatteryManager.BATTERY_PLUGGED_AC;

        int level = batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
        float batteryPercent = level * 100 / (float)scale;

        MemoryHelper memoryHelper = new MemoryHelper(context.getApplicationContext());
        boolean isLowMemory = memoryHelper.isLowMemory();
        long availableMemory = memoryHelper.getAvailableMemory();
        long totalMemory = memoryHelper.getTotalMemory();

    }
}
