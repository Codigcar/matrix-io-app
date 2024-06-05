package pe.io.pushpermission;

import androidx.core.app.NotificationManagerCompat;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Timer;
import java.util.TimerTask;

public class PushPermissionListenerModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "PushPermissionListenerModule";
    private final ReactApplicationContext reactContext;
    private boolean isPermissionGranted = false;
    private final long CHECK_INTERVAL_MS = 3 * 1000;
    private Timer timer;

    public PushPermissionListenerModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        schedulePermissionCheck();
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    public void checkPermissionStatus() {
        isPermissionGranted = NotificationManagerCompat.from(reactContext).areNotificationsEnabled();
    }

    private void schedulePermissionCheck() {
        timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                checkPermissionStatus();
                emitPermissionStatusChangeEvent(isPermissionGranted);
            }
        }, 0, CHECK_INTERVAL_MS);
    }

    private void emitPermissionStatusChangeEvent(boolean isPermissionGranted) {

        if(!reactContext.hasActiveReactInstance()) {
            return;
        }

        this.reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("PermissionStatusChanged", isPermissionGranted);
    }

    @ReactMethod
    public void stopObserving() {
        if (timer != null) {
            timer.cancel();
            timer = null;
        }
    }
}
