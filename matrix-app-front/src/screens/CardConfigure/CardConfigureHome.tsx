import { BackgroundIconScreen } from 'assets/svgs';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Box, Text, Container, rebrandingTheme, PaymentCard,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import ModalAlert from 'src/components/ModalAlert/ModalAlert';
import { ThemeProvider } from '@shopify/restyle';
import { RFValue } from 'react-native-responsive-fontsize';
import { android } from 'src/utils/constants';
import useCardConfiguration from './hooks/useCardConfiguration';
import IconSwitchListItem from './components/IconSwitchListItem';
import CardItem from './components/CardItem';
import SupplementaryCardChangePin from './components/SupplementaryCardChangePin';
import ModalVerifyWallet from '../Wallet/components/ModalVerifyWallet';
import { string } from './shared/strings/string';
import { CardConfigureHomeProps } from './shared/types/screens';
import useWalletConfiguration from '../Wallet/hooks/useWalletConfiguration';

const CardConfigureHome: React.FC<CardConfigureHomeProps> = (props) => {
  const {
    onPressBackArrow,
    isLoading,
    loadingRestrictions,
    cardsList,
    restrictions,
    changeCard,
    changeRestriction,
    onPressChangePin,
    showModal,
    onCloseModal,
  } = useCardConfiguration(props);

  const {
    d1State, openGooglePlay, isGWalletInstalled, isWalletActive,
  } = useWalletConfiguration();

  const [show, setShow] = useState<boolean>(false);

  const handlePressGpayButton = async () => {
    if (android) {
      const responseGWallet = await isGWalletInstalled();
      !responseGWallet ? setShow(true) : setShow(false);
    }
  };

  const handleOpenGooglePlay = async (): Promise<void> => {
    await openGooglePlay();
    setShow(false);
  };
  const supplementaryCardRequireChangePin = cardsList[1]?.requireChangePin;

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        background={BackgroundIconScreen}
        isHeaderVisible
        goBackNavigate={onPressBackArrow}
        headerProps={{
          title: string.configureCardTitle,
          textAlign: 'left',
        }}
      >
        <ScrollView>
          <Box p="spacing-m" pt="spacing-s">
            <Text textAlign="left" variant="Subtitle16pxSemibold">
              {string.configureCard0Title}
            </Text>
            <Text textAlign="auto" variant="body13pxRegular" mt="spacing-xs">
              {string.configureCard0SubtitleInit}
              <Text variant="body13pxSemiBold">iO</Text>
              {string.configureCardSubtitle}
            </Text>
          </Box>
          <Box mb="spacing-m">
            <CardItem>
              <Box mr="spacing-xs">
                <IconSwitchListItem
                  type={cardsList[0].type}
                  label={cardsList[0].label}
                  status={cardsList[0].status}
                  isBlocked={cardsList[0].isBlock}
                  onChange={() => changeCard(cardsList[0].id, 0)}
                  loading={cardsList[0].loading}
                />
              </Box>
              {cardsList[0].status && (
                <Box marginTop="spacing-s">
                  <Box
                    backgroundColor="white"
                    borderRadius={RFValue(24)}
                    py="spacing-m"
                    px="spacing-s"
                  >
                    {cardsList.map((item, index) => (
                      <Box key={item.label}>
                        {index === 0 ? (
                          <IconSwitchListItem
                            type={restrictions[index].type}
                            label={restrictions[index].label}
                            status={restrictions[index].status}
                            onChange={() => changeRestriction(restrictions[index].id, index)}
                            loading={restrictions[index].loading}
                          />
                        ) : (
                          <Box mt="spacing-s">
                            <Box
                              borderColor="primary300"
                              width="100%"
                              height={RFValue(1)}
                              left={0}
                              bottom={0}
                              right={0}
                              borderStyle="dashed"
                              borderWidth={RFValue(0.9)}
                            />
                            {supplementaryCardRequireChangePin ? (
                              <SupplementaryCardChangePin onPress={() => onPressChangePin()} />
                            ) : (
                              <Box mt="spacing-s">
                                <IconSwitchListItem
                                  type={item.type}
                                  label={item.label}
                                  status={item.status}
                                  isBlocked={item.isBlock}
                                  onChange={() => changeCard(item.id, index)}
                                  loading={item.loading}
                                />
                              </Box>
                            )}
                          </Box>
                        )}
                        {!supplementaryCardRequireChangePin
                          && restrictions[index]
                          && !restrictions[index]?.isHiding
                          && index === 1 && (
                          <Box mt="spacing-s">
                            <IconSwitchListItem
                              type={restrictions[index].type}
                              label={restrictions[index].label}
                              status={restrictions[index].status}
                              onChange={() => changeRestriction(restrictions[index].id, index)}
                              loading={restrictions[index].loading}
                            />
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </CardItem>
          </Box>
          {android && isWalletActive ? (
            <PaymentCard
              testID="payment-card"
              payment={android ? 'google-pay' : 'apple-pay'}
              isFailed={Boolean(d1State?.error)}
              isLoading={d1State.loading}
              retryMessage={i18n.t('wallet:wallet-flow.pay-with-io-retry-message')}
              margin="spacing-m"
              mt="spacing-none"
              label={i18n.t(
                android
                  ? 'wallet:wallet-flow.pay-with-io-google-pay-empty'
                  : 'wallet:wallet-flow.pay-with-io-apple-pay-empty',
              )}
              onPress={handlePressGpayButton}
            />
          ) : null}
        </ScrollView>
        <LoadingIndicator isVisible={isLoading || loadingRestrictions} />
        {show && isWalletActive && (
          <ModalVerifyWallet
            type="warning"
            title={i18n.t('wallet:wallet-flow.googlePay.you-need-google-wallet-installed')}
            description={i18n.t('wallet:wallet-flow.googlePay.wallet-indication')}
            isVisible={show}
            confirmButton={{
              label: i18n.t('wallet:wallet-flow.googlePay.go-to-google-play'),
              onPress: async () => await handleOpenGooglePlay(),
            }}
            onClose={() => setShow(false)}
            cancelButton={{
              label: i18n.t('wallet:wallet-flow.googlePay.close-modal-verify-wallet-installed'),
            }}
          />
        )}
        <ModalAlert
          isVisible={showModal}
          title={string.walletFlowNFCIncopatibleTitle}
          message={string.walletFlowNFCIncopatibleMessage}
          buttonText={string.walletFlowUnderstood}
          icon="error"
          close={onCloseModal}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CardConfigureHome;
