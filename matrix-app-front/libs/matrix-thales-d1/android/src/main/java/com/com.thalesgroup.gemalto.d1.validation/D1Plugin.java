package com.thalesgroup.gemalto.d1.validation;

import android.app.Activity;
import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.google.gson.GsonBuilder;
import com.thalesgroup.gemalto.d1.ConfigParams;
import com.thalesgroup.gemalto.d1.D1Exception;
import com.thalesgroup.gemalto.d1.D1Params;
import com.thalesgroup.gemalto.d1.D1Task;
import com.thalesgroup.gemalto.d1.card.OEMPayType;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import androidx.annotation.NonNull;

import com.google.firebase.messaging.FirebaseMessaging;
import com.thalesgroup.gemalto.d1.validation.util.HexUtil;
import com.thalesgroup.gemalto.d1.validation.helper.D1Helper;
import com.thalesgroup.gemalto.d1.validation.util.NotificationUtil;
import android.util.Log;
import android.widget.Toast;
import com.facebook.react.bridge.Promise;
import androidx.annotation.Nullable;
import android.app.Notification;
import com.thalesgroup.gemalto.d1.card.CardMetadata;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.thalesgroup.gemalto.d1.card.CardDetails;
import com.thalesgroup.gemalto.d1.card.CardDigitizationState;

import android.content.pm.PackageManager;
/**
 * D1 React Native entry point.
 */
public class D1Plugin extends ReactContextBaseJavaModule {
    private D1Task mD1Task;
    private final ReactApplicationContext mReactApplicationContext;

    private Boolean mSdkIsConfigured = false;
    private static final String TAG = "D1Plugin";

    D1Plugin(final ReactApplicationContext context) {
        super(context);

        mReactApplicationContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "D1Plugin";
    }

  @ReactMethod
  public void configure(
                        @NonNull final String serviceUrl,
                        @NonNull final String issuerId,
                        @NonNull final String exponent,
                        @NonNull final String modulus,
                        @NonNull final String digitalCardUrl,
                        @NonNull final String consumerId,
                        Promise promise
  ) {
    Log.d(TAG, "call configure()");
    D1Task.ConfigCallback<Void> configCallback = new D1Task.ConfigCallback<Void>() {
      @Override
      public void onSuccess(@Nullable Void ignored) {
        promise.resolve(true);
        Toast.makeText(getReactApplicationContext(), "D1 config is successful", Toast.LENGTH_LONG).show();
      }
      @Override
      public void onError(@NonNull List<D1Exception> exceptions) {
        Log.e(TAG, "D1 config failed, check exception for more detail");
        promise.reject(exceptions.get(0).getErrorCode().getCode()+"_"+ exceptions.get(0).getErrorCode(), exceptions.get(0).getLocalizedMessage());
      }
    };
    final Notification notification = NotificationUtil.getNotification(getReactApplicationContext().getApplicationContext(),
            "This notification is posted to run internal "
                    + "operation of mg sdk",
            "SDK_NOTIFICATION");
    try {
      D1Helper.getInstance().configure(
            serviceUrl,
            issuerId,
            exponent,
            modulus,
            digitalCardUrl,
            consumerId,
              getCurrentActivity(),
              new D1Task.ConfigCallback<Void>() {
                @Override
                public void onSuccess(final Void data) {
                  Log.d(TAG, "Success Configure!!");
                  promise.resolve(true);
                }
                @Override
                public void onError(final List<D1Exception> exceptions) {
                  if (!exceptions.isEmpty()) {
                      Log.d("ThalesD1Module", exceptions.get(0).getLocalizedMessage());
                    promise.reject(exceptions.get(0).getErrorCode().getCode()+"_"+ exceptions.get(0).getErrorCode(), exceptions.get(0).getLocalizedMessage());
                  }
                }
              });
    }catch (Exception e) {
    Log.e(TAG, "Error in configure(): "+e.getMessage());
      promise.reject("configure", e.getMessage());
    }
  }

  @ReactMethod
  public void login(String accessToken, Promise promise){
    Log.d(TAG, "call login()");
    try{
      D1Helper.getInstance().login(accessToken.getBytes(StandardCharsets.UTF_8), new D1Task.Callback<Void>() {
        @Override
        public void onSuccess(final Void data) {
          promise.resolve(true);
        }
        @Override
        public void onError(final D1Exception exception) {
          promise.reject(exception.getErrorCode().getCode()+"_"+ exception.getErrorCode(), exception.getLocalizedMessage());
        }
      });
    }catch(Exception e){
      Log.e(TAG, "error in login() "+e.getMessage());
      promise.reject("login", e.getMessage());
    }
  }

  @ReactMethod
  public void getCardMetadata(@NonNull final String cardId, Promise promise) {
    Log.d(TAG, "call getCardMetadata() with cardId: "+cardId);
    D1Helper.getInstance().getCardMetadata(cardId, new D1Task.Callback<CardMetadata>() {
      @Override
      public void onSuccess(final CardMetadata data) {
        String mMaskedPan = "**** **** ****" + data.getLast4Pan();
        String mExpr = data.getExpiryDate();
        String mCardState = data.getState().toString();
        WritableMap cardMetadata = Arguments.createMap();
        cardMetadata.putString("maskedPan", mMaskedPan);
        cardMetadata.putString("expiryDate", mExpr);
        cardMetadata.putString("cardState", mCardState);
        promise.resolve(cardMetadata);
      }
      @Override
      public void onError(final D1Exception exception) {
        Log.e(TAG, "error in getCardMetadata() "+exception.getMessage());
        promise.reject(exception.getErrorCode().getCode()+"_"+ exception.getErrorCode(), exception.getLocalizedMessage());
      }
    });
  }

  @ReactMethod
  public void getCardDetails(@NonNull final String cardId, Promise promise) {
    Log.d(TAG, "call getCardDetails() with cardId: "+cardId);
    D1Helper.getInstance().getCardDetails(cardId, new D1Task.Callback<CardDetails>() {
      @Override
      public void onSuccess(final CardDetails data) {
        WritableMap cardDetails = Arguments.createMap();
        cardDetails.putString("name", new String(data.getCardHolderName(), StandardCharsets.UTF_8));
        cardDetails.putString("pan", new String(data.getPan(), StandardCharsets.UTF_8));
        cardDetails.putString("cvv", new String(data.getCvv(), StandardCharsets.UTF_8));
        cardDetails.putString("expiryDate", new String(data.getExpiryDate(), StandardCharsets.UTF_8));
        promise.resolve(cardDetails);
        data.wipe();
      }
      @Override
      public void onError(final D1Exception exception) {
        Log.e(TAG, "error in getCardDetails() "+exception.getMessage());
        promise.reject(exception.getErrorCode().getCode()+"_"+ exception.getErrorCode(), exception.getLocalizedMessage());
      }
    });
  }

  @ReactMethod
  public void activateDigitalCard(@NonNull final String cardId, Promise promise) {

      D1Helper.getInstance().activateDigitalCard(cardId, new D1Task.Callback<Void>() {
          @Override
          public void onSuccess(Void unused) {
              promise.resolve(true);
          }

          @Override
          public void onError(@NonNull D1Exception e) {
              promise.reject(e.getLocalizedMessage());
          }
      });
  }
  
  @ReactMethod
  public void getDigitizationState(@NonNull final String cardId, Promise promise) {

    D1Helper.getInstance().getCardDigitizationState(cardId, new D1Task.Callback<CardDigitizationState>() {
        @Override
        public void onSuccess(final CardDigitizationState cardDigitizationState) {
            switch (cardDigitizationState) {

                case NOT_DIGITIZED:
                    promise.resolve("NOT_DIGITIZED");
                    break;
                case DIGITIZED:
                    promise.resolve("DIGITIZED");
                    break;
                case PENDING_IDV:
                    promise.resolve("PENDING_IDV");
                    break;
                case DIGITIZATION_IN_PROGRESS:
                    promise.resolve("DIGITIZATION_IN_PROGRESS");
                    break;
                default:
                    break;
            }

        }

        @Override
        public void onError(@NonNull final D1Exception exception) {
            promise.resolve(false);
        }
    });
}

@ReactMethod
public void digitizeCard(@NonNull final String cardId, Promise promise) {

    Activity activity = mReactApplicationContext.getCurrentActivity();

            D1Helper.getInstance().digitizeCard(cardId, activity, new D1Task.Callback<Object>() {
                @Override
                public void onSuccess(Object o) {
                    promise.resolve(true);
                }

                @Override
                public void onError(@NonNull D1Exception e) {
                    promise.reject(e.getLocalizedMessage());
                }
            });
}
   
    /**
     * Retrieves the {@code D1Task} instance.
     *
     * @return {@code D1Task} instance.
     */
    @NonNull
    private D1Task getD1Task() {
        if (mD1Task == null) {
            throw new IllegalStateException("Need to configure D1 SDK first.");
        }

        return mD1Task;
    }

    /**
     * Creates a JSON representation of the {@code D1Exception}
     *
     * @param exceptions Exception.
     * @return JSON representation.
     */
    private String createJsonError(final List<D1Exception> exceptions) {
        final List<Map<String, Object>> json = new ArrayList<>();
        for (final D1Exception exception : exceptions) {
            final Map<String, Object> jsonMap = new HashMap<>();
            jsonMap.put("message", exception.getLocalizedMessage());
            jsonMap.put("code", exception.getErrorCode().getCode());
            json.add(jsonMap);
        }

        if (json.size() > 1) {
            return new GsonBuilder().setPrettyPrinting().create().toJson(json);
        } else if (json.size() == 1) {
            return new GsonBuilder().setPrettyPrinting().create().toJson(json.get(0));
        }

        return new GsonBuilder().setPrettyPrinting().create().toJson(json);
    }

    /**
     * Sets the current push token to D1 SDK.
     */
    private void getCurrentPushToken() {
        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(task -> {
            if (!task.isSuccessful()) {
                return;
            }

            // Get new FCM registration token
            final String token = task.getResult();
            mD1Task.updatePushToken(token, new D1Task.Callback<Void>() {
                @Override
                public void onSuccess(final Void data) {
                    // nothing to do
                }

                @Override
                public void onError(@NonNull final D1Exception exception) {
                    // ignore error
                }
            });
        });
    }

    @ReactMethod
    public String getLibVersions() {
        return  getD1Task().getSDKVersions().toString();
    }

    @ReactMethod
    public void logout(Promise promise) {

      try{
      D1Helper.getInstance().logout(new D1Task.Callback<Void>() {
        @Override
        public void onSuccess(final Void data) {
          promise.resolve(true);
        }
        @Override
        public void onError(final D1Exception exception) {
          promise.reject(exception.getErrorCode().getCode()+"_"+ exception.getErrorCode(), exception.getLocalizedMessage());
        }
      });
    }catch(Exception e){
      Log.e(TAG, "error in login() "+e.getMessage());
      promise.reject("login", e.getMessage());
    }

    }

    @ReactMethod
    public void isWalletInstalled(@NonNull final String packageName,Promise promise) {
      try {
        PackageManager packageManager = getReactApplicationContext().getPackageManager();
        packageManager.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
        promise.resolve(true); 
      } catch (PackageManager.NameNotFoundException e) {
        promise.resolve(false); 
      }
    }
}
