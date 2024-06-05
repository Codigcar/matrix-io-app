package com.thalesgroup.gemalto.d1.validation.helper;

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.google.firebase.messaging.FirebaseMessaging;
import com.thalesgroup.gemalto.d1.CardPINUI;
import com.thalesgroup.gemalto.d1.ConfigParams;
import com.thalesgroup.gemalto.d1.D1Exception;
import com.thalesgroup.gemalto.d1.D1Params;
import com.thalesgroup.gemalto.d1.D1Task;
import com.thalesgroup.gemalto.d1.EntryUI;
import com.thalesgroup.gemalto.d1.PINDisplayTextView;
import com.thalesgroup.gemalto.d1.SecureEditText;
import com.thalesgroup.gemalto.d1.card.CardAction;
import com.thalesgroup.gemalto.d1.card.CardActivationMethod;
import com.thalesgroup.gemalto.d1.card.CardDataChangedListener;
import com.thalesgroup.gemalto.d1.card.CardDetails;
import com.thalesgroup.gemalto.d1.card.CardDigitizationState;
import com.thalesgroup.gemalto.d1.card.CardMetadata;
import com.thalesgroup.gemalto.d1.card.DigitalCard;
import com.thalesgroup.gemalto.d1.card.OEMPayType;
import com.thalesgroup.gemalto.d1.validation.util.HexUtil;

import java.util.List;

/**
 * Helper class for D1 SDK.
 */
public class D1Helper {


    private static final D1Helper INSTANCE = new D1Helper();

    private D1Task mD1Task;
    private Boolean mSdkIsConfigured = false;

    private D1Helper() {
        // private constructor
    }

    /**
     * Retrieves the singleton instance of {@code D1Helper}.
     *
     * @return Singleton instance of {@code D1Helper}.
     */
    @NonNull
    public static D1Helper getInstance() {
        return INSTANCE;
    }

    /**
     * Configures the D1 SDK.
     *
     * @param consumerId         Consumer ID.
     * @param activity           Activity.
     * @param callback           Callback.
     */
    
    public void configure(
                        @NonNull final String serviceUrl,
                        @NonNull final String issuerId,
                        @NonNull final String exponent,
                        @NonNull final String modulus,
                        @NonNull final String digitalCardUrl,
                        @NonNull final String consumerId,
                        @NonNull final Activity activity,
                        @NonNull final D1Task.ConfigCallback<Void> callback) {
        // D1Core config.
        mD1Task = new D1Task.Builder().setContext(activity.getApplicationContext()).setD1ServiceURL(serviceUrl)
                .setIssuerID(issuerId)
                .setD1ServiceRSAExponent(HexUtil.hexStringToByteArray(exponent))
                .setD1ServiceRSAModulus(HexUtil.hexStringToByteArray(modulus))
                .setDigitalCardURL(digitalCardUrl).build();

        final D1Params coreConfig = ConfigParams.buildConfigCore(consumerId);
        final D1Params cardConfig = ConfigParams.buildConfigCard(activity, OEMPayType.GOOGLE_PAY, null);


        mD1Task.configure(new D1Task.ConfigCallback<Void>() {
            @Override
            public void onSuccess(final Void unused) {
                synchronized (INSTANCE) {
                    mSdkIsConfigured = true;
                }

                getCurrentPushToken();
                callback.onSuccess(unused);
            }

            @Override
            public void onError(@NonNull final List<D1Exception> list) {
                callback.onError(list);
            }
        }, coreConfig,cardConfig);
    }

    /**
     * Logs in.
     *
     * @param issuerToken Issuer token.
     * @param callback    Callback.
     */
    public void login(@NonNull final byte[] issuerToken, @NonNull final D1Task.Callback<Void> callback) {
        getD1Task().login(issuerToken, callback);
    }

    /**
     * Logs out.
     *
     * @param callback Callback.
     */
    public void logout(@NonNull final D1Task.Callback<Void> callback) {
        getD1Task().logout(callback);
    }

    public void handleResult(final int requestCode, final int resultCode, @Nullable final Intent data) {
        getD1Task().handleCardResult(requestCode, resultCode, data);
    }

    /**
     * Retrieves the card meta data.
     *
     * @param cardId   Card ID.
     * @param callback Callback.
     */
    public void getCardMetadata(@NonNull final String cardId, @NonNull final D1Task.Callback<CardMetadata> callback) {
        getD1Task().getCardMetadata(cardId, callback);
    }

    /**
     * Retrieves the card meta data.
     *
     * @param cardId   Card ID.
     * @param callback Callback.
     */
    public void getCardDetails(@NonNull final String cardId, @NonNull final D1Task.Callback<CardDetails> callback) {
        getD1Task().getCardDetails(cardId, callback);
    }

    /**
     * Checks if card is digitized.
     *
     * @param cardId   Card ID.
     * @param callback Callback.
     */
    public void getCardDigitizationState(@NonNull final String cardId,
                                         @NonNull final D1Task.Callback<CardDigitizationState> callback) {

        getD1Task().getD1PushWallet().getCardDigitizationState(cardId, OEMPayType.GOOGLE_PAY, callback);

    }

    /**
     * Digitizes the card.
     *
     * @param cardId   Card ID.
     * @param callback Callback.
     */
    public void digitizeCard(@NonNull final String cardId, Activity activity, @NonNull final D1Task.Callback<Object> callback) {
        getD1Task().getD1PushWallet().addDigitalCardToOEM(cardId, OEMPayType.GOOGLE_PAY, activity, callback);
    }

    /**
     * Activates the digital card.
     *
     * @param cardId   Card ID.
     * @param callback Callback.
     */
    public void activateDigitalCard(@NonNull final String cardId, @NonNull final D1Task.Callback<Void> callback) {
        getD1Task().activateDigitalCard(cardId, callback);
    }

    /**
     * Activates the physical card.
     *
     * @param cardId         Card ID.
     * @param secureTextEdit Secure text edit, where the code entered.
     * @param callback       Callback.
     */
    public void activatePhysicalCard(@NonNull final String cardId,
                                     @NonNull final SecureEditText secureTextEdit,
                                     @NonNull final D1Task.Callback<Void> callback) {
        final EntryUI entryUI = new EntryUI(secureTextEdit);
        getD1Task().activatePhysicalCard(cardId, entryUI, callback);
    }

    /**
     * Retrieves the PIN of the physical card.
     *
     * @param cardId             Card ID.
     * @param pinDisplayTextView PINDisplayTextView where the PIN is displayed.
     * @param callback           Callback.
     */
    public void getPhysicalCardPin(@NonNull final String cardId,
                                   @NonNull final PINDisplayTextView pinDisplayTextView,
                                   @NonNull final D1Task.Callback<Void> callback) {
        final CardPINUI cardPINUI = new CardPINUI(pinDisplayTextView);
        getD1Task().displayPhysicalCardPIN(cardId, cardPINUI, callback);
    }

    /**
     * Retrieves card activation method.
     *
     * @param cardId   Card ID.
     * @param callback Callback.
     */
    public void getActivationMethod(@NonNull final String cardId,
                                    @NonNull final D1Task.Callback<CardActivationMethod> callback) {
        getD1Task().getCardActivationMethod(cardId, callback);
    }

    /**
     * Activates the physical card.
     *
     * @param cardId   Card ID.
     * @param callback Callback.
     */

    /**
     * Checks if the D1 SDK is configured.
     *
     * @return {@code True} if configured, else {@code false}.
     */
    public boolean isConfigured() {
        return mD1Task != null;
    }

    /**
     * Retrieves the list of digital cards for D1Push.
     *
     * @param cardId   Card ID.
     * @param callback Callback.
     */
    public void getDigitalCardListD1Push(@NonNull final String cardId,
                                         @NonNull final D1Task.Callback<List<DigitalCard>> callback) {
        getD1Task(). getDigitalCardList(cardId, callback);
    }



    /**
     * Suspends the digital card.
     *
     * @param cardId      Card ID.
     * @param digitalCard Digital card.
     * @param callback    Callback.
     */
    public void suspendDigitalCard(@NonNull final String cardId,
                                   @NonNull final DigitalCard digitalCard,
                                   @NonNull final D1Task.Callback<Boolean> callback) {
        getD1Task().updateDigitalCard(cardId, digitalCard, CardAction.SUSPEND, callback);
    }

    /**
     * Resumes the digital card.
     *
     * @param cardId      Card ID.
     * @param digitalCard Digital card.
     * @param callback    Callback.
     */
    public void resumeDigitalCard(@NonNull final String cardId,
                                  @NonNull final DigitalCard digitalCard,
                                  @NonNull final D1Task.Callback<Boolean> callback) {
        getD1Task().updateDigitalCard(cardId, digitalCard, CardAction.RESUME, callback);
    }

    /**
     * Deletes the digital card.
     *
     * @param cardId      Card ID.
     * @param digitalCard Digital card.
     * @param callback    Callback.
     */
    public void deleteDigitalCard(@NonNull final String cardId,
                                  @NonNull final DigitalCard digitalCard,
                                  @NonNull final D1Task.Callback<Boolean> callback) {
        getD1Task().updateDigitalCard(cardId, digitalCard, CardAction.DELETE, callback);
    }

    /**
     * Updates the push token.
     *
     * @param pushToken Push token to update.
     * @param callback  Callback.
     */
    public void setPushToken(@NonNull final String pushToken, @NonNull final D1Task.Callback<Void> callback) {
        synchronized (INSTANCE) {
            if (mSdkIsConfigured) {
                // SDK already configured.
                mD1Task.updatePushToken(pushToken, callback);
            } else {
                // SDK not yet configured.
                // Notify callback to not block the flow.
                callback.onSuccess(null);
            }
        }
    }



    /**
     * Registers the CardDataChangedListener - D1Push.
     *
     * @param cardDataChangedListener CardDataChangedListener.
     */
    public void registerCardDataChangeListener(@NonNull final CardDataChangedListener cardDataChangedListener) {
        getD1Task().registerCardDataChangedListener(cardDataChangedListener);
    }

    /**
     * Unregisters the CardDataChangedListener - D1Push.
     */
    public void unregisterCardDataChangeListener() {
        getD1Task().unRegisterCardDataChangedListener();
    }




    /**
     * Retrieves the D1 SDK versions.
     *
     * @return D1 SDK versions.
     */
    public String getLibVersions() {
        return D1Task.getSDKVersions().toString();
    }

    /**
     * Retrieves the {@code D1Task} instance.
     *
     * @return {@code D1Task} instance.
     */
    @NonNull
    public D1Task getD1Task() {
        if (mD1Task == null) {
            throw new IllegalStateException("Need to configure D1 SDK first.");
        }

        return mD1Task;
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

}

