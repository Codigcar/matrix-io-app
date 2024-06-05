import React from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
// Components
import {
  Text,
  TextInput,
  Box,
  fonts,
  Container,
  Button,
  rebrandingTheme,
} from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationPropsType } from 'src/types/types';
// Assets
import RadioButtonGroup from 'src/matrix-ui-components/components/radio-button-group';
import { Modalize } from 'react-native-modalize';
import { CheckBox } from 'src/matrix-ui-components/components/checkbox';
import { ThemeProvider } from '@shopify/restyle';
import {
  BackgroundIconScreen,
  CancellationAccountIcon,
  CloseButton,
  DivideLineIcon,
} from 'assets/svgs';
import useCancelAccountSurvey from './hooks/useCancelAccountSurvey';
import { string } from '../strings/string';
import { testID } from '../strings/testID';

const CancelAccountSurvey: React.FC<NavigationPropsType> = (props) => {
  const {
    onCancelAccount,
    reasonsDescriptions,
    isLoading,
    onPressBackArrow,
    onOpen,
    onClose,
    indexSelected,
    setIndexSelected,
    otherReason,
    setOtherReason,
    isCheck,
    setIsCheck,
    modalizeRef,
    height,
    styleModal,
    disabledButton,
  } = useCancelAccountSurvey(props);
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Modalize
        ref={modalizeRef}
        modalHeight={height * 0.6}
        withHandle={false}
        closeOnOverlayTap={!isLoading}
        overlayStyle={styleModal}
      >
        <Box testID={testID.cancelAccountSurveyModal} flex={1} justifyContent="space-between" py="spacing-m" pl="spacing-m" pr="spacing-s">
          <Box mb="spacing-m" flexDirection="row" alignItems="center">
            <Box flex={1}>
              <Text variant="Heading24Medium">{string.cancelAccountSurveyModalTitle}</Text>
            </Box>
            <TouchableOpacity onPress={() => onClose(modalizeRef)}>
              <CloseButton />
            </TouchableOpacity>
          </Box>

          <Text variant="label" mb="spacing-xs">
            <Text paddingHorizontal="spacing-xxs" mb="spacing-m" variant="SubTitle16">
              {string.cancelAccountSurveyModalSubtitle1}
            </Text>
            <Text
              textAlign="center"
              paddingHorizontal="spacing-xxs"
              mb="spacing-m"
              variant="label"
              fontWeight="bold"
              color="primary800"
            >
              {string.cancelAccountSurveyModalSubtitle2}
            </Text>
          </Text>
          <Box flexDirection="row" pr="spacing-xxxm">
            <CancellationAccountIcon />
            <Text
              ml="spacing-xs"
              mb="spacing-s"
              variant="body14Regular"
              color="primary800"
              fontFamily={fonts.euclidCircularRegular}
            >
              <Text
                paddingHorizontal="spacing-xs"
                mb="spacing-m"
                variant="body14Regular"
                fontWeight="bold"
                color="primary1000"
                fontFamily={fonts.euclidCircularRegular}
              >
                {string.cancelAccountSurveyModalTextTitle}
              </Text>
              {string.cancelAccountSurveyModalTextSubtitle}
            </Text>
          </Box>
          <DivideLineIcon />
          <Box mt="spacing-s" flexDirection="row">
            <CheckBox isCheck={isCheck} onPress={() => setIsCheck(!isCheck)} />
            <Text paddingHorizontal="spacing-xxxs" variant="body14Regular" color="primary800">
              {string.cancelAccountSurveyModalCheckboxInfo}
            </Text>
          </Box>
          <Button
            variant={isCheck && !isLoading ? 'primary' : 'disabled'}
            my="spacing-m"
            onPress={() => onCancelAccount(indexSelected, otherReason)}
            label={string.cancelAccountSurveyModalBtnCancelAccount}
            disabled={!isCheck || isLoading}
            justifyContent="space-around"
          />
        </Box>
      </Modalize>

      <Container
        background={BackgroundIconScreen}
        isHeaderVisible
        isScrollable
        withInput
        goBackNavigate={onPressBackArrow}
        headerTitle={string.cancelAccountHeader}
      >
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="position">
          <Box justifyContent="flex-end" m="spacing-xs">
            <Box flexDirection="column" justifyContent="center">
              <Text
                textAlign="center"
                mt="spacing-m"
                mb="spacing-s"
                variant="Heading24Medium"
                color="primary1000"
              >
                {string.cancelAccountSurveyTitle}
              </Text>
              <Text
                textAlign="center"
                paddingHorizontal="spacing-xxs"
                mb="spacing-s"
                variant="SubTitle16"
                color="primary800"
              >
                {string.cancelAccountSurveySubtitle}
              </Text>
              <Box
                backgroundColor="primary100"
                borderRadius={RFValue(24)}
                marginHorizontal="spacing-xxxxs"
                mt="spacing-m"
                p="spacing-m"
              >
                <Text
                  textAlign="left"
                  paddingHorizontal="spacing-xxxs"
                  variant="SubTitle"
                  fontSize={16}
                  lineHeight={24}
                  fontWeight="bold"
                  mb="spacing-s"
                  fontFamily={fonts.euclidCircularRegular}
                >
                  {string.cancelAccountSurveyQuestion}
                </Text>
                <Box pl="spacing-xxs" pr="spacing-m">
                  <RadioButtonGroup
                    indexSelected={indexSelected}
                    onSelect={(index) => setIndexSelected(index)}
                    options={reasonsDescriptions}
                  />
                </Box>
                <Box mt="spacing-xs" px="spacing-xs">
                  {indexSelected === 3 && (
                    <TextInput
                      label={string.cancelAccountSurveyOption4Title}
                      value={otherReason}
                      numberOfLines={3}
                      multiline
                      placeholder={string.cancelAccountSurveyOption4Placeholder}
                      height={RFValue(40)}
                      onChangeText={setOtherReason}
                    />
                  )}
                </Box>
              </Box>
            </Box>
            <Button
              testID={testID.cancelAccountSurveyActionButton}
              variant={disabledButton ? 'disabled' : 'primary'}
              my="spacing-m"
              mt="spacing-xxm"
              onPress={() => onOpen(modalizeRef)}
              label={string.cancelAccountSurveyContinueButton}
              disabled={disabledButton}
            />
          </Box>
        </KeyboardAvoidingView>
      </Container>
    </ThemeProvider>
  );
};

export default CancelAccountSurvey;
