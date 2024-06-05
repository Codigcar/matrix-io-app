package pe.io.zendeskchatSDK;
import android.app.Activity;
import android.content.Context;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.lang.String;

import javax.annotation.Nullable;

import zendesk.chat.Chat;
import zendesk.chat.ChatConfiguration;
import zendesk.chat.ChatEngine;
import zendesk.chat.ChatMenuAction;
import zendesk.chat.ChatProvidersConfiguration;
import zendesk.chat.ChatSessionStatus;
import zendesk.chat.ChatState;
import zendesk.chat.ObservationScope;
import zendesk.chat.Observer;
import zendesk.chat.PreChatFormFieldStatus;
import zendesk.chat.VisitorInfo;
import zendesk.messaging.MessagingActivity;

public class RNZendeskChatModule extends ReactContextBaseJavaModule {

  private ReactContext appContext;
  private static final String TAG = "RNZendeskChatModule";

  public RNZendeskChatModule(ReactApplicationContext reactContext) {
    super(reactContext);
    appContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNZendeskChatModule";
  }

  @ReactMethod
  public void initChat(String key) {
    Context context = appContext;
    Chat.INSTANCE.init(context, key);
  }

  @ReactMethod
  public void configVisitor(ReadableMap options) {
    VisitorInfo.Builder builder = VisitorInfo.builder();
    if (options.hasKey("name")) {
      builder = builder.withName(options.getString("name"));
    }
    if (options.hasKey("email")) {
      builder = builder.withEmail(options.getString("email"));
    }
    if (options.hasKey("phone")) {
      builder = builder.withPhoneNumber(options.getString("phone"));
    }
    VisitorInfo visitorInfo = builder.build();

    ChatProvidersConfiguration chatProvidersConfiguration = ChatProvidersConfiguration.builder()
            .withVisitorInfo(visitorInfo)
            .build();

    Chat.INSTANCE.setChatProvidersConfiguration(chatProvidersConfiguration);
  }

  @ReactMethod
  public void startChat(ReadableMap options) {
    String botName = options.getString("botName");
    ChatConfiguration chatConfiguration = ChatConfiguration.builder()
                        .withAgentAvailabilityEnabled(true)
                        .withOfflineFormEnabled(true)
                        .withPreChatFormEnabled(true)
                        .withTranscriptEnabled(false)
                        .withNameFieldStatus(PreChatFormFieldStatus.HIDDEN)
                        .withEmailFieldStatus(PreChatFormFieldStatus.HIDDEN)
                        .withPhoneFieldStatus(PreChatFormFieldStatus.HIDDEN)
                        .withDepartmentFieldStatus(PreChatFormFieldStatus.REQUIRED)
                        .withChatMenuActions(ChatMenuAction.END_CHAT)
                        .build();

    Chat.INSTANCE.providers().chatProvider().observeChatState(new ObservationScope(), new Observer<ChatState>() {
      @Override
      public void update(ChatState chatState) {
        if(chatState.getChatSessionStatus().equals(ChatSessionStatus.STARTED)){
          WritableMap params = Arguments.createMap();
          params.putString("status", "CHATTING");
          sendEvent(appContext, "onCall", params);
        }

        if(chatState.getChatSessionStatus().equals(ChatSessionStatus.ENDED)){
          WritableMap params = Arguments.createMap();
          params.putString("status", "ENDED");
          sendEvent(appContext, "onCall", params);
        }
      }
    });

    Activity activity = getCurrentActivity();
    MessagingActivity.builder()
            .withBotLabelString(botName)
            .withEngines(ChatEngine.engine())
            .show(activity, chatConfiguration);

  }


  private void sendEvent(ReactContext reactContext,
                         String eventName,
                         @Nullable WritableMap params) {
    reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
  }

}