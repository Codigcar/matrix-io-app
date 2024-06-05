package pe.io.i2cmodule;

import android.os.Looper;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.i2cinc.mcpsdk.MCPSDKManager;
import com.i2cinc.mcpsdk.config.Localization;
import com.i2cinc.mcpsdk.config.ScreenPresentingOption;
import com.i2cinc.mcpsdk.config.UIConfig;
import com.i2cinc.mcpsdk.interfaces.MCPSDKCallback;
import com.i2cinc.mcpsdk.interfaces.MCPSDKTask;

import java.util.Map;
import java.util.HashMap;

import pe.io.R;

public class I2CModule extends ReactContextBaseJavaModule implements MCPSDKCallback {

 private ReactContext mReactContext;
 private UIConfig uiConfig;
 private HashMap<String, String> params = new HashMap<>();
 private MCPSDKTask currentTask;
 private android.os.Handler handler;
 private Runnable finishRunnable;

   I2CModule(ReactApplicationContext context) {
       super(context);
       mReactContext = context;
       uiConfig = new UIConfig();
       uiConfig.setHideNavigationBar(false);
       uiConfig.setHideBackNavigationButton(false);
       uiConfig.setNavBarBGColor(R.color.color_white);
       uiConfig.setBackgroundColor("#ffffff");
       uiConfig.setLoadingIndicatorColor("#FF0000");
       uiConfig.setPresentingOption(ScreenPresentingOption.DIALOG);
       uiConfig.setLocalizationOption(Localization.es);
       MCPSDKManager.getInstance().setUiConfig(uiConfig);
   }


    @ReactMethod
    public void startTask(String appId, String apiKey, String authToken, String cardRefNo, String typeTask ) {
     params.put("authToken", authToken);
     params.put("cardRefNo", cardRefNo);
     currentTask = MCPSDKManager.getInstance().startTask(typeTask, params, uiConfig, this);
    }

    @ReactMethod
    public void finishTaskTimeOut(Integer timeOut) {
        try {
            handler = new android.os.Handler(Looper.getMainLooper());
            finishRunnable = new Runnable() {
                public void run() {
                    currentTask.exit();
                }
            };

            handler.postDelayed(finishRunnable, timeOut + 6000);

            currentTask.getContext();
        } catch (Exception e) {
            Log.i("I2CModule", "Error" + e.getMessage());
        }
    }

    @ReactMethod
    public void finishTask() {
        try {
            currentTask.exit();
            currentTask.getContext();
        } catch (Exception e) {
            Log.i("I2CModule", "Error" + e.getMessage());
        }
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private int listenerCount = 0;

    @ReactMethod
    public void addListener(String eventName) {
        if (listenerCount == 0) {
            // Set up any upstream listeners or background tasks as necessary
        }
        listenerCount += 1;
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        listenerCount -= count;
        if (listenerCount == 0) {
            // Remove upstream listeners, stop unnecessary background tasks
        }
    }

    @ReactMethod
    public void cleanInterval() {
      if (handler != null && finishRunnable != null) {
          handler.removeCallbacks(finishRunnable);
      }
    }

    @Override
    public String getName() {
        return "RNi2cModule";
    }

    @Override
    public boolean onLoadingStarted() {
        WritableMap params = Arguments.createMap();
        params.putString("description", "Loading");
        sendEvent(mReactContext, "onLoading", params);
        return false;
    }

    @Override
    public void onLoadingCompleted() {
        WritableMap params = Arguments.createMap();
        params.putString("description", "Success");
        sendEvent(mReactContext, "onSuccess", params);
    }

    @Override
    public void onSuccess(Map<String, String> map) {
        WritableMap params = Arguments.createMap();
        params.putString("description", "SuccessTaskChange "+ currentTask);
        sendEvent(mReactContext, "onSuccessTaskChange", params);
    }

    @Override
    public void onError(String s, String s1) {
        WritableMap params = Arguments.createMap();
        params.putString("errorCode","Error Code: " + s );
        params.putString("errorDescription", s1 );
        sendEvent(mReactContext, "onError", params);
    }

    @Override
    public void onCancel() {

    }

    @Override
    public void onClose() {
        WritableMap params = Arguments.createMap();
        params.putString("description", "Closed");
        sendEvent(mReactContext, "onClosed", params);

        if (handler != null && finishRunnable != null) {
            handler.removeCallbacks(finishRunnable);
        }
    }
}