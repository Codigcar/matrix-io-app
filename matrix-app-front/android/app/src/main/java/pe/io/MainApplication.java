package pe.io;

import android.app.Application;
import android.os.StrictMode;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import java.util.List;
import pe.io.i2cmodule.I2CModulePackage;
import pe.io.inAppWalletModule.InAppWalletModulePackage;
import pe.io.pushpermission.PushPermissionListenerPackage;
import pe.io.zendeskchatSDK.RNZendeskChatPackage;
import android.content.res.Configuration;
import android.util.DisplayMetrics;
import android.view.WindowManager;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new RNZendeskChatPackage());
          packages.add(new I2CModulePackage());
          packages.add(new PushPermissionListenerPackage());
          packages.add(new InAppWalletModulePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    if (Boolean.parseBoolean(BuildConfig.DEVELOPER_MODE)) {
          StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder()
                  .detectDiskReads()
                  .detectDiskWrites()
                  .detectNetwork()
                  .penaltyLog()
                  .build());
          StrictMode.setVmPolicy(new StrictMode.VmPolicy.Builder()
                  .detectLeakedSqlLiteObjects()
                  .detectLeakedClosableObjects()
                  .penaltyLog()
                  .penaltyDeath()
                  .build());
    }
    super.onCreate();
    adjustFontScale(getResources().getConfiguration());
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
  
  private void adjustFontScale(Configuration configuration) {
    configuration.fontScale = (float) 1.0;
    DisplayMetrics metrics = getResources().getDisplayMetrics();
    WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
    wm.getDefaultDisplay().getMetrics(metrics);
    metrics.scaledDensity = configuration.fontScale * metrics.density;
    getBaseContext().getResources().updateConfiguration(configuration, metrics);
  }
}