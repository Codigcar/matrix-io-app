import React, { useEffect } from 'react';
import { Box, SafeAreaBox, Text } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationPropsType } from 'src/types/types';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import CircularProgressBar from 'src/screens/Wellcome/Wellcome/CircularProgressBar';
import { BackHandler } from 'react-native';
import useRedemption from '../hooks/useRedemption';

const RedemptionLoading = (props: NavigationPropsType) => {
  const { StatusImage, screenContent, progress } = useRedemption(props);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  return (
    <BackgroundWrapper>
      <Box flex={1} marginTop="spacing-ml">
        <StatusImage />
      </Box>
      <SafeAreaBox flex={1} alignItems="center" justifyContent="center">
        <Box mt="spacing-xxxxxs" height={RFValue(50)}>
          <Text variant="Heading20Medium" textAlign="center">
            {screenContent.title}
          </Text>
        </Box>
        <Box my="spacing-m" height={RFValue(70)}>
          <CircularProgressBar percent={progress} />
        </Box>
        <Text variant="SubTitle16" textAlign="center">
          {screenContent.description}
        </Text>
      </SafeAreaBox>

    </BackgroundWrapper>
  );
};
export default RedemptionLoading;
