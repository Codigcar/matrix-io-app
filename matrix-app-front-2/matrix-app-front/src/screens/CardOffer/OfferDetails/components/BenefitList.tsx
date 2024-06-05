import React, { useEffect, useState } from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import {
  Text, Box, Button,
} from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Pressable } from 'react-native';
import IOCard from 'assets/svgs/io_card.svg';
import InfoCircle from 'assets/svgs/info-circle-fill-blue.svg';
import { vs } from 'src/utils/sizes';
import { setAnalyticRoute } from 'src/utils/Analytics';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import OfferAdditionalModal from './OfferAdditionalModal';
import { IOffer } from '../../interfaces';
import CheckListItem from './CheckListItem';

type BenefitListProps = {
  offer?: IOffer;
};

const benefitList = [
  {
    title: i18n.t('card-offer-benefit-list-first-item-title'),
  },
  {
    title: i18n.t('card-offer-benefit-list-second-item-title'),
  },
  {
    title: i18n.t('card-offer-benefit-list-third-item-title'),
  },
  {
    title: i18n.t('card-offer-benefit-list-fourth-item-title'),
  },
];

const BenefitList: React.FC<BenefitListProps> = ({ offer }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      setAnalyticRoute('CardOfferMoreDetails');
    } else {
      setAnalyticRoute(navigationScreenNames.cardOfferDetails);
    }
  }, [modalVisible]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const additionalInfoList = [
    {
      label: i18n.t('card-offer-benefit-second-list-first-item-item', {
        billingDay: offer?.billingDay,
      }),
    },
    {
      label: i18n.t('card-offer-benefit-second-list-second-item-item', {
        desgravamen: offer?.desgravamen ? (offer.desgravamen * 100).toPrecision(3) : '',
        maxValueDesgravamen: offer?.maxValueDesgravamen,
      }),
    },
    {
      label: i18n.t('card-offer-benefit-second-list-third-item-item', {
        tea: offer?.tea ? (offer.tea * 100).toPrecision(3) : '',
      }),
    },
    {
      label: i18n.t('card-offer-benefit-second-list-fourth-item-item', {
        tcea: offer?.tcea.toPrecision(2).split('.')[1],
      }),
    },
  ];

  return (
    <Box
      backgroundColor="complementaryIndigo050"
      borderRadius={RFValue(24)}
      padding="spacing-m"
      pt="spacing-xxm"
      pb="spacing-m"
      mt="spacing-xxs"
    >
      <Box position="absolute" alignSelf="center" top={vs(-42)}>
        <IOCard />
      </Box>

      <Text textAlign="left" mb="spacing-s" mt="spacing-m" variant="Subtitle16pxMedium">
        {i18n.t('card-offer-benefit-first-list-section-title')}
      </Text>
      <Box mr="spacing-s">
        {benefitList.map((item) => (
          <Box key={item.title} mb="spacing-xxs">
            <CheckListItem label={item.title} />
          </Box>
        ))}
      </Box>

      <Pressable onPress={toggleModal}>
        <Box mt="spacing-xxxs" mb="spacing-xxxs" flexDirection="row" alignItems="center">
          <InfoCircle width={RFValue(20)} height={RFValue(20)} />
          <Text
            testID="btn-show-info"
            ml="spacing-xxs"
            textDecorationLine="underline"
            textAlign="left"
            variant="Link14Medium"
            color="complementaryIndigo600"
          >
            {i18n.t('card-offer-benefit-second-list-section-link')}
          </Text>
        </Box>
      </Pressable>

      <OfferAdditionalModal
        title={i18n.t('card-offer-benefit-second-list-section-title')}
        onClose={toggleModal}
        isVisible={modalVisible}
      >
        <Box paddingRight="spacing-s" marginTop="spacing-xxxs" marginBottom="spacing-m">
          {additionalInfoList.map((item) => (
            <Box key={item.label} mb="spacing-xs">
              <CheckListItem type="regular" label={item.label} />
            </Box>
          ))}
        </Box>

        <Button
          onPress={toggleModal}
          variant="primary"
          m="spacing-xxxs"
          label={i18n.t('understood')}
        />
      </OfferAdditionalModal>
    </Box>
  );
};

BenefitList.defaultProps = {
  offer: undefined,
};

export default BenefitList;
