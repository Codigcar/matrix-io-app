import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts } from 'src/matrix-ui-components/theme/themes';
import { DOCUMENTS_BASE_URL } from 'src/utils/constants';
import { BenefitsRoutesEnum } from 'src/shared/enums/routes/benefits-routes.enum';
import Box from '../box';
import Tag from './Tag';
import { Text } from '../text';
import ImageBox from '../image';

interface Props {
  item: BenefitItemProps;
  onClickItem: () => void;
}
export interface BenefitItemProps {
  category?: string;
  offerTitle?: string;
  imgPath?: string;
  id?: string;
  benefit?: string;
  channel?: 'Presencial' | 'Virtual' | 'Presencial y virtual';
  partnerName: string;
}

export const BenefitItem: FC<Props> = ({ item, onClickItem }) => {
  const navigation = useNavigation();

  const handleOnPress = async () => {
    if (onClickItem) onClickItem();
    navigation.navigate(BenefitsRoutesEnum.BENEFITS_STACK, {
      screen: BenefitsRoutesEnum.BENEFIT_DETAILS,
      params: { id: item.id },
    });
  };

  const urlImage = DOCUMENTS_BASE_URL + (item.imgPath ?? '');

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Box
        borderRadius={24}
        padding="spacing-xs"
        flexDirection="row"
        alignItems="center"
        marginHorizontal="spacing-xxxs"
        backgroundColor="complementaryPrimary100"
      >
        <ImageBox
          source={{
            uri: urlImage,
          }}
          style={{ width: '48%' }}
          height={118}
          borderRadius={16}
        />
        <Box
          flexDirection="column"
          alignItems="flex-start"
          marginLeft="spacing-xs"
          width="45%"
          height="100%"
          paddingRight="spacing-xs"
        >
          <Tag mood="Presencial" amount={item.benefit} fontSize={12} />
          <Text
            color="black"
            fontWeight="500"
            paddingTop="spacing-xxxs"
            paddingBottom="spacing-xxxs"
            fontFamily={fonts.outfitRegular}
            fontSize={16}
            letterSpacing={0.16}
            lineHeight={19}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.partnerName}
          </Text>
          <Text
            color="primary800"
            fontSize={12}
            numberOfLines={2}
            letterSpacing={0.16}
            lineHeight={17}
          >
            {item.offerTitle}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default BenefitItem;
