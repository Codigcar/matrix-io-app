import React from 'react';
import { Image } from 'react-native';
import { i18n } from 'src/utils/core/MTXStrings';
import ArrowSquareRight from 'assets/svgs/arrow-square-right.svg';
import { Transactions as Movements } from 'assets/images';
import { Box, Text } from 'matrix-ui-components';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from 'src/types/types';
import HomeCardWrapper from '../HomeCardWrapper';

const Transactions = () => {
  const navigation = useNavigation<NavigationType>();
  const goToTransactions = () => {
    navigation.navigate('TransactionsStack');
  };

  return (
    <HomeCardWrapper
      testID="transactions-component"
      onPress={goToTransactions}
      color="complementaryOcean100"
    >
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        pb="spacing-xs"
      >
        <Text fontWeight="400" variant="Subtitle15pxSemibold" color="primary1000" mr="spacing-xxxs">
          {i18n.t('home:transactions.movements')}
        </Text>
        <ArrowSquareRight />
      </Box>
      <Image source={Movements} />
      <Text variant="smallLabelCard" mt="spacing-xs" color="complementaryOcean800">
        {i18n.t('home:transactions.view-movements')}
      </Text>
    </HomeCardWrapper>
  );
};
Transactions.defaultProps = {
  disabled: false,
};
export default Transactions;
