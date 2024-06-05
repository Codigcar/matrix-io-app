import React, { useEffect, useState } from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import {
  Text, Box, Button,
} from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Pressable } from 'react-native';
import { IOCard, InfoCircleFillBlue} from 'assets/svgs';
import { vs } from 'src/utils/sizes';
import { setAnalyticRoute } from 'src/utils/Analytics';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import OfferAdditionalModal from './OfferAdditionalModal';
import { IOffer } from '../../shared/interfaces';
import CheckListItem from './CheckListItem';
import { string } from '../../shared/strings/string';
import { testID } from '../../shared/strings/testID';

type BenefitListProps = {
  offer?: IOffer;
};

const benefitList = [
  {
    title: string.cardOfferBenefitListFirstItemTitle,
  },
  {
    title: string.cardOfferBenefitListSecondItemTitle,
  },
  {
    title: string.cardOfferBenefitListThirdItemTitle,
  },
  {
    title: string.cardOfferBenefitListFourthItemTitle,
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
      label: i18n.t('cardOffer:card-offer-benefit-second-list-first-item-item', {
        billingDay: offer?.billingDay,
      }),
    },
    {
      label: i18n.t('cardOffer:card-offer-benefit-second-list-second-item-item', {
        desgravamen: offer?.desgravamen ? (offer.desgravamen * 100).toPrecision(3) : '',
        maxValueDesgravamen: offer?.maxValueDesgravamen,
      }),
    },
    {
      label: i18n.t('cardOffer:card-offer-benefit-second-list-third-item-item', {
        tea: offer?.tea ? (offer.tea * 100).toPrecision(3) : '',
      }),
    },
    {
      label: i18n.t('cardOffer:card-offer-benefit-second-list-fourth-item-item', {
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
        {string.cardOfferBenefitFirstListSectionTitle}
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
          <InfoCircleFillBlue width={RFValue(20)} height={RFValue(20)} />
          <Text
            testID={testID.btnShowInfoId}
            ml="spacing-xxs"
            textDecorationLine="underline"
            textAlign="left"
            variant="Link14Medium"
            color="complementaryIndigo600"
          >
            {string.cardOfferBenefitSecondListSectionLink}
          </Text>
        </Box>
      </Pressable>

      <OfferAdditionalModal
        title={string.cardOfferBenefitSecondListSectionTitle}
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
          label={string.understood}
          testID={testID.btnUnderstoodId}
        />
      </OfferAdditionalModal>
    </Box>
  );
};

BenefitList.defaultProps = {
  offer: undefined,
};

export default BenefitList;
