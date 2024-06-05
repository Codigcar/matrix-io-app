import React from 'react';
import { Dimensions } from 'react-native';
import { Text, Box } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import Carousel from 'react-native-snap-carousel';
import { shortenText } from 'src/screens/Benefits/shared/utils/shortenText';
import Location from '../Location';

const { width } = Dimensions.get('window');

interface ItemLocalDiscount {
  local: string;
  location: string;
}
interface BoxLocationInDetailsProps {
  localDiscounts: ItemLocalDiscount[];
}

const BoxLocationInDetails = (props: BoxLocationInDetailsProps) => {
  const { localDiscounts } = props;
  const LIMIT_CHARACTERS_TO_SHOW = 27;

  const lengthLocalDiscounts = localDiscounts.length;
  const withInBaseLength = lengthLocalDiscounts > 1 ? width - 78 : width - 60;

  const slideItem = ({ item }: { item: ItemLocalDiscount }) => (
    <Box
      flexDirection="row"
      alignItems="center"
      backgroundColor="complementaryIndigo050"
      padding="spacing-xs"
      borderRadius={RFValue(16)}
    >
      <Box
        backgroundColor="primary000"
        borderRadius={8}
        width={RFValue(42)}
        height={RFValue(42)}
        marginRight="spacing-s"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Location width={24} height={24} strokeColor={colors.primary1000} />
      </Box>
      <Box flexDirection="column">
        <Text variant="body14Medium" color="primary1000">
          {shortenText(item.local, LIMIT_CHARACTERS_TO_SHOW)}
        </Text>
        <Text variant="body14Regular" color="complementaryIndigo500">
          {shortenText(item.location, LIMIT_CHARACTERS_TO_SHOW)}
        </Text>
      </Box>
    </Box>
  );

  return (
    <Box padding="spacing-none" margin="spacing-none">
      <Carousel
        testID="carousel"
        layout="default"
        data={localDiscounts}
        renderItem={slideItem}
        sliderWidth={width}
        itemWidth={withInBaseLength}
        enableMomentum
        decelerationRate={0.9}
        activeSlideAlignment="start"
      />
    </Box>
  );
};

export default BoxLocationInDetails;
