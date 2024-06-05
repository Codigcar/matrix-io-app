import React from 'react';
import { Box, fonts, Text } from 'matrix-ui-components';
import { wp } from 'src/utils/sizes';
import CardEdit from 'assets/svgs/card-edit.svg';
import { i18n } from 'src/utils/core/MTXStrings';
import { CardEditDisabled } from 'assets/svgs';
import {
  CARD_IS_INACTIVE,
  CARD_REQUIRE_ACTIVATION,
  CARD_WITH_FRAUD,
} from 'src/utils/constants';
import { RFValue } from 'react-native-responsive-fontsize';
import CardConfigurationSkeleton from './skeleton/CardConfigurationSkeleton';
import HomeCardWrapper from './HomeCardWrapper';
import useCardConfigurationHome from './hooks/useCardConfigurationHome';
import useDeliquentValues from './hooks/useDelinquentValues';

interface CardProps {
  account: string;
  id: string;
  isMain: boolean;
  number: string;
  reference: string;
  status: string;
}

interface CardConfigurationTypeProps {
  isLoadingCards: boolean;
}

const CardConfiguration = ({
  isLoadingCards,
}: CardConfigurationTypeProps) => {
  const {
    statusVirtualCard,
    onPressCardConfigure,
    disabledProp,
    cards,
    isBlockedCard,
    isIssued,
  } = useCardConfigurationHome();
  const { isConfigDelinquentDisabled } = useDeliquentValues();
  const disabled = disabledProp || statusVirtualCard === CARD_WITH_FRAUD;
  const textColor = disabled || isConfigDelinquentDisabled ? 'primary500' : 'primary1000';
  const isMainNotActivated = statusVirtualCard === CARD_REQUIRE_ACTIVATION;

  const colorIssued = (cardStatus: string, isMain: boolean) =>
    (isIssued(cardStatus) ? 'primary500' : 'black');

  const isDisable = (cardStatus: string, isMain: boolean) =>
    (disabled || isConfigDelinquentDisabled ? 'primary500' : colorIssued(cardStatus, isMain));
  const isVirtualCard = (isVirtual: boolean) =>
    (isVirtual ? 'card-configuration-home.virtual-card' : 'card-configuration-home.physical-card');

  const cardDefault = {
    account: '',
    id: '',
    isMain: true,
    number: '',
    reference: '',
    status: CARD_IS_INACTIVE,
  };

  const cardStatus = (card: CardProps, index: number) => (
    <Box flexDirection="row" alignItems="center" mr="spacing-s" key={`card-${index}`}>
      <Box
        width={8}
        mr="spacing-xxxs"
        aspectRatio={1}
        borderRadius={4}
        backgroundColor={
          isMainNotActivated ? 'complementaryPumpking500' : isDisable(card.status, card.isMain)
        }
      />
      <Text fontFamily={fonts.outfitRegular} color={textColor} variant="body13pxRegular">
        {i18n.t(isVirtualCard(card.isMain))}
      </Text>
    </Box>
  );

  const cardStatusList = () => {
    if (!cards?.length) return cardStatus(cardDefault, 0);
    return cards.map(
      (item: CardProps, index: number) =>
        !(!item.isMain && isBlockedCard(item.status)) && cardStatus(item, index),
    );
  };

  return (
    <HomeCardWrapper
      onPress={onPressCardConfigure}
      width={wp(45)}
      rightBorderRadiusHidden
      color={!disabled && !isConfigDelinquentDisabled ? 'complementaryPrimary100' : 'primary100'}
      disabled={disabled || isConfigDelinquentDisabled}
    >
      <>
        <Box flexDirection="row" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Text color={textColor} variant="bodySemibold">
              {i18n.t('home-card-configuration-title')}
            </Text>
          </Box>
          {!disabled && !isConfigDelinquentDisabled
            ? <CardEdit width={RFValue(24)} />
            : <CardEditDisabled />}
        </Box>
        <Box flexDirection="row" mt="spacing-xxxs">
          {isLoadingCards
            ? (
              <Box justifyContent="flex-end" height={RFValue(19.6)}>
                <CardConfigurationSkeleton isVisible />
              </Box>
            ) : cardStatusList()}
        </Box>
      </>
    </HomeCardWrapper>
  );
};

export default CardConfiguration;
