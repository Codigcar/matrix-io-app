package pe.io.inAppWalletModule;

import static android.app.Activity.RESULT_OK;

import static pe.io.helpers.InAppHelper.convertJsonToMap;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONException;
import org.json.JSONObject;

import pe.io.MainActivity;

@ReactModule(name = "InAppWalletModule")
public class InAppWalletModule extends ReactContextBaseJavaModule {

    private static final String IN_APP_TAG = "GOOGLE_PAY_ACTIVATION";

    private static ReactApplicationContext reactContext;

    InAppWalletModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "InAppWalletModule";
    }

    @ReactMethod
    public void sendResultToWalletApp(String status) {
        MainActivity activity = (MainActivity) getCurrentActivity();
        if (activity != null) {
            Intent resultIntent = new Intent();
            resultIntent.putExtra("BANKING_APP_ACTIVATION_RESPONSE", status);
            // "approved", "declined", or "failure"
            activity.setResult(RESULT_OK, resultIntent);
            activity.finish();
        }
    }

    public void sendEventToReactNative(String eventName, String jsonEventData) {
        ReactApplicationContext context = getReactApplicationContext();
        if (context.hasActiveCatalystInstance()) {

            JSONObject jsonObject = null;
            try {
                jsonObject = new JSONObject(jsonEventData);
                WritableMap eventData = convertJsonToMap(jsonObject);

                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(eventName, eventData);

            } catch (JSONException e) {
                Log.e(IN_APP_TAG, "Error sending event to React Native", e);
            }

        }
    }

}