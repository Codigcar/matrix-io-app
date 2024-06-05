import React, { useCallback } from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { Text, Box, Divider, SafeAreaBox, ScrollBox } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import Slider from 'src/matrix-ui-components/components/slider';
import BenefitItem from 'src/matrix-ui-components/components/slider/BenefitItem';
import { SlideProps } from 'src/screens/Benefits/shared/interfaces/benefits-list.interfaces';
import { screenWidth } from 'src/utils/constants';
import useBenefitsData from 'src/screens/Benefits/modules/benefits-list/benefits-list.presenter';
import BenefitsWrapper from 'src/screens/Benefits/components/BenefitsWrapper';
import BenefitsHomeSkeleton from 'src/screens/Benefits/skeleton/BenefitsHomeSkeleton';
import BenefitsError from 'src/screens/Benefits/components/BenefitsError';

const BenefitsList = () => {
  const { benefitsList, loading, selectItemSlider } = useBenefitsData();

  const renderBenefitCategory = useCallback(
    (category: any) => (
      <Box
        key={category.name}
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        marginBottom={category.list.length > 1 ? 'spacing-s' : 'spacing-none'}
      >
        <Text
          variant="SubTitle18SemiBold"
          numberOfLines={2}
          color="primary1000"
          marginBottom="spacing-xs"
          marginLeft="spacing-m"
        >
          {category.name}
        </Text>

        <Box flex={1}>
          <Slider
            onClickItem={(sliderItem: SlideProps) => selectItemSlider(sliderItem, category.name)}
            listItems={category.list}
            widthItemCustom={screenWidth - 40}
            ItemSlider={BenefitItem}
          />
        </Box>
      </Box>
    ),
    [selectItemSlider],
  );

  const renderContent = useCallback(() => {
    if (loading) {
      return (
        <Box
          flexDirection="column"
          alignItems="flex-start"
          marginLeft="spacing-m"
          marginRight="spacing-m"
        >
          <Divider height={22} />
          <BenefitsHomeSkeleton isVisible />
        </Box>
      );
    }

    const categories = benefitsList?.coupons?.categoryList || [];
    if (categories.length === 0) {
      return (
        <Box
          flex={1}
          flexDirection="column"
          alignItems="center"
          marginLeft="spacing-m"
          marginRight="spacing-m"
        >
          <Divider height={40} />
          <BenefitsError />
        </Box>
      );
    }

    return (
      <Box marginBottom="spacing-xl">
        <Divider height={22} />
        {categories.map(renderBenefitCategory)}
      </Box>
    );
  }, [benefitsList, loading, renderBenefitCategory]);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <BenefitsWrapper>
        <SafeAreaBox flex={1} mt="spacing-l">
          <ScrollBox flex={1} showsVerticalScrollIndicator={false}>
            <Box marginLeft="spacing-m">
              <Text variant="H3" numberOfLines={2} color="primary1000">
                {i18n.t('benefits:title')}
              </Text>
            </Box>
            {renderContent()}
          </ScrollBox>
        </SafeAreaBox>
      </BenefitsWrapper>
    </ThemeProvider>
  );
};

export default React.memo(BenefitsList);
