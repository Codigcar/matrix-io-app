import React, { FC } from 'react';
import {
  Box, Button, Text, fonts,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { ToastInfoIcon } from 'assets/svgs';
import InfoModal from 'src/screens/Soon/components/InfoModal';

type IText = {
  idx: number;
  icon: string;
  description: string;
};

const TEXTS: IText[] = [
  {
    idx: 1,
    icon: ToastInfoIcon,
    description: i18n.t('cardPayment.modal-same-currency.description-1'),
  },
  {
    idx: 2,
    icon: ToastInfoIcon,
    description: i18n.t('cardPayment.modal-same-currency.description-2'),
  },
  {
    idx: 3,
    icon: ToastInfoIcon,
    description: i18n.t('cardPayment.modal-same-currency.description-3'),
  },
];

const ModalSameCurrency: FC<any> = ({ isVisible, onClose }) => (
  <InfoModal
    isVisible={isVisible}
    onClose={onClose}
    showIconClose={false}
    title={i18n.t('cardPayment.modal-same-currency.title')}
    animationType="slide"
  >
    <Box paddingRight="spacing-m">
      {TEXTS.map((item) => (
        <Box key={item.idx} flexDirection="row" paddingBottom="spacing-s">
          <ToastInfoIcon />
          <Box paddingLeft="spacing-xs">
            <Text
              color="primary800"
              fontFamily={fonts.outfitRegular}
              fontSize={14}
              fontWeight="400"
              letterSpacing={0.16}
              lineHeight={19.6}
              variant="body14Regular"
            >
              {item.description}
            </Text>
          </Box>
        </Box>
      ))}

      <Button onPress={onClose} variant="primary" m="spacing-xxxs" label={i18n.t('cardPayment.modal-error-confirm')} />
    </Box>
  </InfoModal>
);
export default ModalSameCurrency;
