import React from 'react';
import {
  Box,
  Button,
  CheckBox,
  SafeAreaBox,
  Text,
} from 'matrix-ui-components';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { f, s } from 'src/utils/sizes';
import { FeedbackInformative } from 'assets/svgs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';
import { strings } from './offer-unavailable.strings';
import useCardOfferUnavailable from './offer-unavailable.presenter';

const OfferUnavailableScreen: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<ReactNavigation.AuthNavigator, SignUpRoutesEnum.OFFER_UNAVAILABLE>,
    NativeStackScreenProps<ReactNavigation.RootStackParamList>
  >
> = (props) => {
  const {
    onPressContinue,
    onPressLink,
    isChecked,
    handleCheck,
  } = useCardOfferUnavailable(props);

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} mx="spacing-m">
        <Box flex={1} mx="spacing-xxs">
          <Box
            flex={1.5}
            alignItems="center"
            justifyContent="center"
            pt="spacing-l"
          >
            <FeedbackInformative width={s(68)} height={s(68)} />
          </Box>
          <Box flex={1} mb="spacing-ml">
            <Text
              variant="Heading28Medium"
              fontSize={f(24)}
              textAlign="center"
              mb="spacing-s"
            >
              {strings.title}
            </Text>
            <Text
              variant="SubTitle18pxRegular"
              fontSize={f(17)}
              lineHeight={f(21)}
              textAlign="center"
              mb="spacing-xxm"
              mx="spacing-s"
            >
              {strings.description}
            </Text>
          </Box>
        </Box>
        <Box flexDirection="row" mb="spacing-xxm" mr="spacing-s">
          <CheckBox
            isCheck={isChecked}
            onPress={handleCheck}
            analytics={{ valor: strings.legal_check + strings.legal_check_link }}
          />
          <Box flex={1}>
            <Text>
              <Text
                variant="body14Regular"
                fontSize={f(12)}
                lineHeight={f(17)}
                color="primary800"
              >
                {strings.legal_check}
              </Text>
              <Text
                variant="Link14Medium"
                fontSize={f(12)}
                color="complementaryIndigo600"
                onPress={onPressLink}
              >
                {strings.legal_check_link}
              </Text>
            </Text>
          </Box>
        </Box>
        <Button
          label={strings.button}
          onPress={onPressContinue}
          mb="spacing-m"
        />
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default OfferUnavailableScreen;
