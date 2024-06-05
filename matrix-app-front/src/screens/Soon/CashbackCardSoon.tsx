import React, { FC, useEffect, useState } from 'react';
import {
  Box, Button, Text, fonts,
} from 'matrix-ui-components';
import Check from 'assets/svgs/Check-rounded.svg';
import Cashback from 'assets/svgs/Money.svg';
import Cuestion from 'assets/svgs/Cuestion.svg';
import { i18n } from 'src/utils/core/MTXStrings';
import { CARD_IS_INACTIVE, DOCUMENTS_BASE_URL } from 'src/utils/constants';
import { useNavigation } from '@react-navigation/native';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { useSelector } from 'react-redux';
import Helpers from 'src/utils/Helpers';
import { RedemptionRoutesEnum } from 'src/shared/enums/routes/redemption-routes-enum';
import { useCashBackSelectors } from 'src/core/libraries-implementation';
import InfoModal, { IInfoModalPropsType } from './components/InfoModal';
import ModalSoonAnalytics from './analytics/modalSoon.analytics';
import FeatureItem from './components/FeatureItem';

const document = {
  title: i18n.t('cashBack:document.title'),
  url: `${DOCUMENTS_BASE_URL}cashback.pdf`,
  theme: 'dark',
};

const featureItems = [
  {
    icon: Check,
    title: i18n.t('cashBack:soon-modal.how-to-win.title'),
    description: i18n.t('cashBack:soon-modal.how-to-win.description'),
  },
  {
    icon: Cashback,
    title: i18n.t('cashBack:soon-modal.earn.title'),
    description: i18n.t('cashBack:soon-modal.earn.description'),
  },
  {
    icon: Cuestion,
    title: i18n.t('cashBack:soon-modal.how-to-use.title'),
    description: i18n.t('cashBack:soon-modal.how-to-use.description'),
  },
];

const CashbackCardSoon: FC<IInfoModalPropsType> = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const {
    minRedemptionPoints,
    pointsExchangeRate,
    accumulatedCashback,
  } = useCashBackSelectors();
  const minRedemptionAmount = minRedemptionPoints * pointsExchangeRate;
  const [isDisabled, setIsDisabled] = useState(false);
  const statusControlMaster = useSelector((state: any) => state.cards?.statusCard);
  const isActiveControlMaster = statusControlMaster === CARD_IS_INACTIVE;

  useEffect(() => {
    ModalSoonAnalytics.onShowModal();
    setIsDisabled((minRedemptionAmount > accumulatedCashback) || isActiveControlMaster);
  }, []);

  const goToDocument = () => {
    navigation.navigate(navigationScreenNames.documentDetail, document);
  };

  const goToPayMyCard = () => {
    ModalSoonAnalytics.onUseCashback();
    navigation.navigate(RedemptionRoutesEnum.REDEMPTION);
  };

  return (
    <InfoModal title={i18n.t('cashBack:soon-modal.title')} isVisible={isVisible} onClose={onClose}>
      <Text
        variant="body14Regular"
        fontFamily={fonts.outfitRegular}
        color="primary800"
        fontWeight="400"
        fontSize={14}
        lineHeight={19.6}
        letterSpacing={0.16}
      >
        {i18n.t('cashBack:soon-modal.description')}
      </Text>

      <Box mt="spacing-m">
        {featureItems.map((item) => (
          <FeatureItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}

        <Text mb="spacing-xxm">
          <Text variant="body14pxRegular" color="primaryDarkest">
            {i18n.t('cashBack:soon-modal.apply')}
          </Text>
          <Text
            onPress={goToDocument}
            variant="body14pxRegular"
            color="complementaryIndigo600"
            textDecorationLine="underline"
          >
            {i18n.t('cashBack:soon-modal.terms-and-conditions')}
          </Text>
        </Text>

        <Text mb="spacing-xxs" textAlign="center">
          <Text variant="body13pxRegular" color="primary500">
            {i18n.t('cashBack:soon-modal.message.descriptionOne')}
          </Text>
          <Text
            variant="body13pxSemiBold"
            color="complementaryIndigo600"
          >
            {Helpers.formatCurrency(minRedemptionAmount, { removeDecimalsWhenRounded: true })}
          </Text>
          <Text variant="body13pxRegular" color="primary500">
            {i18n.t('cashBack:soon-modal.message.descriptionTwo')}
          </Text>
        </Text>

        <Button
          variant={isDisabled ? 'disabled' : 'primary'}
          disabled={isDisabled}
          onPress={goToPayMyCard}
          m="spacing-xxxs"
          label={i18n.t('cashBack:redemption.button-use-my-cashback')}
        />
      </Box>
    </InfoModal>
  );
};
export default CashbackCardSoon;
