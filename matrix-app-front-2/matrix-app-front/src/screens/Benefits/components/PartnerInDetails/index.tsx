import React from 'react';
import { Platform } from 'react-native';
import { Text, Box, ImageBox, Divider } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { DOCUMENTS_BASE_URL } from 'src/utils/constants';
import SubTitleTextInDetails from '../SubTitleTextInDetails';

interface PartnerInDetailsProps {
  imgPathLogo: string | undefined;
  partnerName: string | undefined;
  category: string | undefined;
}

const PartnerInDetails = ({
  imgPathLogo = '',
  partnerName = '',
  category = '',
}: PartnerInDetailsProps) => {
  const resizeModeImage = Platform.OS === 'ios' ? 'stretch' : 'cover';
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      marginBottom="spacing-m"
    >
      <Box maxHeight={RFValue(56)} maxWidth={RFValue(56)} marginRight="spacing-s">
        <ImageBox
          testID="imageBox"
          width={RFValue(56)}
          height={RFValue(56)}
          maxHeight={RFValue(56)}
          maxWidth={RFValue(56)}
          borderRadius={RFValue(16)}
          aspectRatio={8.5 / 5.5}
          alignSelf="center"
          overflow="hidden"
          source={{
            uri: DOCUMENTS_BASE_URL + (imgPathLogo ?? ''),
          }}
          resizeMode={resizeModeImage}
        />
      </Box>
      <Box>
        <SubTitleTextInDetails text={partnerName} />
        <Divider height={RFValue(4)} />
        <Text
          textAlign="left"
          variant="body13Regular"
          lineHeight={RFValue(17.5)}
          color="primary500"
        >
          {category}
        </Text>
      </Box>
    </Box>
  );
};

export default PartnerInDetails;
