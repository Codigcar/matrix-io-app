package pe.io;
import static pe.io.helpers.InAppHelper.decodeBase64;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import android.content.Intent;
import android.util.Log;
import com.i2cinc.mcpsdk.MCPSDKManager;
import pe.io.inAppWalletModule.InAppWalletModule;

public class MainActivity extends ReactActivity {
    private static final String LOG_TAG = "MAIN_ACTIVITY";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    MCPSDKManager.getInstance().init(this, BuildConfig.APP_ID_I2C, BuildConfig.API_KEY_I2C);

    setupGooglePayActivation();
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "matrix";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }

  @Override
    public void onNewIntent(Intent intent) {
         super.onNewIntent(intent);
         setIntent(intent);
         setupGooglePayActivation();
    }

  void setupGooglePayActivation(){

    if ("com.google.android.gms".equals(getCallingPackage())) {
     
      String data = getIntent().getStringExtra(Intent.EXTRA_TEXT);
      String decodedData = decodeBase64(data);
      sendEventInModule( decodedData);
    } else {
      Log.d(LOG_TAG, "The caller is not Google Pay (Google Play Services)");
    }

  }

    private void sendEventInModule(String eventJsonString) {
        ReactInstanceManager reactInstanceManager = getReactInstanceManager();
        if (reactInstanceManager != null) {
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
            if (reactContext != null) {
                InAppWalletModule inAppWalletModule = reactContext.getNativeModule(InAppWalletModule.class);
                if (inAppWalletModule != null) {
                    inAppWalletModule.sendEventToReactNative("CARD_ACTIVATION", eventJsonString);
                }
            }
        }
    }

}
