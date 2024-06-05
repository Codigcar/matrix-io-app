import { BackgroundIconScreen } from 'assets/svgs';
import { Box, Container, rebrandingTheme, Text } from 'matrix-ui-components';
import React from 'react';
import { ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import ModalAlert from 'src/components/ModalAlert/ModalAlert';

import { ThemeProvider } from '@shopify/restyle';

import CardItem from './components/CardItem';
import IconSwitchListItem from './components/IconSwitchListItem';
import SupplementaryCardChangePin from './components/SupplementaryCardChangePin';
import useCardConfiguration from './hooks/useCardConfiguration';
import { string } from './strings/string';
import { CardConfigureHomeProps } from './types/types';

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
              {string.configureCard0Subtitle}
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
        </ScrollView>
        <LoadingIndicator isVisible={isLoading || loadingRestrictions} />
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
