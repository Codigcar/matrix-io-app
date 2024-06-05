package com.thalesgroup.gemalto.d1.validation;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import androidx.annotation.NonNull;

/**
 * D1 Package to register the D1 React wrapper.
 */
public class D1Package implements ReactPackage {

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull final ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new D1Plugin(reactContext));
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull final ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}