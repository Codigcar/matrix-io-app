import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import {
  Box,
  Text,
  TextInput,
  Button,
  Switch,
  KeyboardAvoidingBox,
  ScrollBox,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { Form } from 'src/components/Form';
import { useRemoteConfigGetValue, RemoteConfigParams } from 'src/shared/providers/remote-config';
import { RegexReplaceDni } from 'src/utils/regex/InputValidator';
import { useDispatch } from 'react-redux';
import {
  resetGiftHasBeenSeen,
  resetEmptyGift,
  turnOffCashbackModal,
} from 'src/screens/Welcome/states/welcomeState';
import { Animated } from 'react-native';
import SeedModal from 'src/utils/seed/ChangeDeviceModal/SeedModal';
import useWelcome from 'src/screens/Welcome/Welcome/hooks/useWelcome';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import { ios } from 'src/utils/constants';
import Welcome from 'src/screens/Welcome/Welcome/Welcome';
import LogoIO from 'assets/svgs/LogoiO.svg';
import useKeyboard from 'src/utils/hooks/useKeyboard';
import ProcessingModal from 'src/screens/CardOffer/modals/ProcessingModal';
import Load from 'src/screens/CardOffer/components/Load';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ReCaptchaModalError from 'src/screens/auth/components/AuthModalError';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';
import { ModalContext } from 'src/shared/contexts';
import ExceedAttemptsModal from './components/ExceedAttemptsModal';
import useSigInPresenter from './sign-in.presenter';
import ForceUpdateModal from './components/ForceUpdateModal/ForceUpdateModal';
import OptionalUpdateModal from './components/OptionalUpdateModal/OptionalUpdateModal';

export const SignInScreen: React.FC<NavigationPropsType> = (props) => {
  const dispatch = useDispatch();
  const { value } = useRemoteConfigGetValue(RemoteConfigParams.newAccountButton);
  const { navigation, route } = props;
  const { identitySaved } = route.params || '';
  const {
    onSubmitAuth,
    errorAuth,
    isLoadingReissues,
    onSubmitReissues,
    isModalOpen,
    closeModal,
    newDeviceAuth,
    isLoading,
    loginBlockType,
    firstName,
    Logout,
    onUpdatePress,
    showForceUpdateModal,
    showOptionalUpdateModal,
    onCloseOptionalUpdateModal,
  } = useSigInPresenter(props, identitySaved);
  const [changeNumberDNI, setChangeNumberDNI] = useState(false);
  const { isKeyboardVisible } = useKeyboard();
  const [showLogoAndText, setShowLogoAndText] = useState(true);
  // eslint-disable-next-line max-len
  const { updateVerifyEmailModal, updateMysteryBoxModal, updateFraudBlockModal } = useContext(ModalContext);
  const safeAreaInsets = useSafeAreaInsets();

  const formatDNIremember = (lastSesion: string) =>
    (!changeNumberDNI && lastSesion
      ? `${lastSesion.slice(0, 2)}••••${lastSesion.slice(-2)}`
      : undefined);

  const { handleRegisterPress } = useWelcome();
  const slideForm = useState(new Animated.Value(0))[0];
  const logoAndText = useState(new Animated.Value(0))[0];

  const slideInForm = () => {
    Animated.timing(slideForm, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    dispatch(turnOffCashbackModal());
    updateVerifyEmailModal(false);
    updateMysteryBoxModal(false);
    updateFraudBlockModal(false);
    dispatch(resetGiftHasBeenSeen());
    dispatch(resetEmptyGift());
  }, []);

  const updateLogoDisplay = useCallback(
    (show: boolean) => {
      Animated.timing(logoAndText, {
        toValue: show ? 1 : 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      setShowLogoAndText(show);
    },
    [logoAndText],
  );

  useEffect(() => {
    updateLogoDisplay(!isKeyboardVisible);
  }, [isKeyboardVisible, updateLogoDisplay]);

  const contentContainerStyle = {
    flexGrow: 1,
    justifyContent: !isKeyboardVisible ? 'center' : 'flex-start',
  } as const;

  return (
    <>
      <BackgroundWrapper>
        <ScrollBox
          contentContainerStyle={contentContainerStyle}
          style={{ marginTop: safeAreaInsets.top }}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingBox
            mt="spacing-none"
            behavior={ios ? 'padding' : undefined}
          >
            <Form
              initialValues={{
                dni: identitySaved || '',
                passwordLogin: '',
                rememberMe: !!identitySaved,
              }}
              onSubmit={onSubmitAuth}
              enableReinitialize
              validateOnMount
              validateOnBlur
              validateOnChange
            >
              {({
                handleSubmit,
                handleBlur,
                values,
                handleChange,
                setFieldValue,
                isSubmitting,
                isValid,
                errors,
              }) => (
                <Box flex={1} justifyContent="center" width="100%">
                  <Box paddingHorizontal="spacing-m" justifyContent="center" mb="spacing-xm">
                    <Animated.View style={{ opacity: logoAndText }}>
                      {showLogoAndText && <LogoIO />}
                    </Animated.View>
                    <Text mt="spacing-m" mb="spacing-xxxs" variant="Heading32Medium">
                      {i18n.t('wellcome-title')}
                    </Text>
                    <Animated.View style={{ opacity: logoAndText }}>
                      {showLogoAndText && (
                        <Text variant="SubTitle24">{i18n.t('wellcome-subtitle')}</Text>
                      )}
                    </Animated.View>
                  </Box>
                  <Box height={0}>
                    <Welcome onEndAnimation={slideInForm} />
                  </Box>
                  <Animated.View style={{ opacity: slideForm }}>
                    <Box mx="spacing-sm">
                      <TextInput
                        containerProps={{ marginBottom: 'spacing-s' }}
                        letterSpacing={identitySaved && !changeNumberDNI ? 3 : 1}
                        label={i18n.t('loginFlow.enterDNI')}
                        placeholder={i18n.t('loginFlow.placeholderDNI')}
                        value={formatDNIremember(identitySaved) || values.dni}
                        onBlur={handleBlur('dni')}
                        keyboardType="numeric"
                        testID="dni"
                        maxLength={8}
                        disableCopyPaste
                        error={Boolean(!!errorAuth || errors?.dni)}
                        onChangeText={(value) => {
                          if (identitySaved && !changeNumberDNI) {
                            setChangeNumberDNI(true);
                            setFieldValue?.('dni', '');
                          } else setFieldValue?.('dni', value.replace(RegexReplaceDni, ''));
                        }}
                      />
                      <Switch
                        onToggle={(value) => setFieldValue?.('rememberMe', value)}
                        label={i18n.t('loginFlow.rememberDNI')}
                        checked={values.rememberMe}
                        testID="rememberMe"
                        mt="spacing-xxxxxs"
                        mb="spacing-m"
                      />
                      <TextInput
                        containerProps={{ marginBottom: 'spacing-s' }}
                        label={i18n.t('loginFlow.enterPassword')}
                        placeholder={i18n.t('loginFlow.placeholderPassword')}
                        value={values.passwordLogin}
                        secureTextEntry
                        testID="password"
                        disableCopyPaste
                        textHelper={i18n.t('loginFlow.errorMessage')}
                        onBlur={handleBlur('passwordLogin')}
                        error={Boolean(!!errorAuth || errors?.passwordLogin)}
                        onChangeText={handleChange('passwordLogin')}
                      />
                      <Box mt="spacing-xxxxxs" mb="spacing-xm" alignItems="flex-end">
                        <Text
                          textAlign="right"
                          variant="link"
                          onPress={() =>
                            navigation.navigate(AuthRoutesEnum.PASSWORD_RECOVERY_STACK)}
                        >
                          {i18n.t('loginFlow.forgotPasssword')}
                        </Text>
                      </Box>
                      <Box
                        paddingHorizontal="spacing-xxxxxs"
                        flexDirection={value?.asBoolean() ? 'column-reverse' : 'column'}
                      >
                        <Button
                          variant={isValid && !isSubmitting ? 'primary' : 'disabled'}
                          onPress={() => handleSubmit()}
                          testID="submit-login"
                          label={i18n.t('loginFlow.button')}
                          disabled={!isValid || isSubmitting}
                        />
                        <Button
                          label={i18n.t('onboarding-buttons-register')}
                          variant="secondary"
                          onPress={handleRegisterPress}
                          my="spacing-s"
                        />
                      </Box>
                    </Box>
                    <SeedModal
                      name={firstName}
                      onClose={() => {
                        closeModal();
                        Logout();
                      }}
                      isOpen={isModalOpen}
                      modalType={loginBlockType}
                      onSubmit={() => {
                        if (loginBlockType === 'fraud_blocked') {
                          closeModal();
                          onSubmitReissues();
                        } else newDeviceAuth(values);
                      }}
                    />
                  </Animated.View>
                </Box>
              )}
            </Form>
            <LoadingIndicator isVisible={isLoading} />
          </KeyboardAvoidingBox>
          <ProcessingModal isVisible={isLoadingReissues}>
            <Load type="generatingCard" />
          </ProcessingModal>
          <ExceedAttemptsModal />
          <ReCaptchaModalError />
        </ScrollBox>
      </BackgroundWrapper>
      <ForceUpdateModal isOpen={showForceUpdateModal} onUpdatePress={onUpdatePress} />
      <OptionalUpdateModal
        isOpen={showOptionalUpdateModal}
        onUpdatePress={onUpdatePress}
        onClose={onCloseOptionalUpdateModal}
      />
    </>
  );
};
export default SignInScreen;