import React from 'react';
import { Box, SafeAreaBox, Text } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import CircularProgressBar from 'src/screens/Wellcome/Wellcome/CircularProgressBar';
import { NavigationPropsType } from 'src/types/types';
import { useRedemptionLoadingPresenter } from './redemption-loading.presenter';
import { RedemptionProps } from '../../shared/types';

export const RedemptionLoading: React.FC<RedemptionProps & NavigationPropsType> = (props) => {
  const { StatusImage, screenContent, progress } = useRedemptionLoadingPresenter(props);

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
