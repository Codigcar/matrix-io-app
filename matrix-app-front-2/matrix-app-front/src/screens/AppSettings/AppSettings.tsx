import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Box, fonts, Container } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { Background } from 'assets/images';
import { NavigationPropsType } from 'src/types/types';
import useAppSettings from './hooks/useAppSettings';
import BiometrySettings from './components/BiometrySettings';

const AppSettings = (props: NavigationPropsType) => {
  const { onBackPress } = useAppSettings(props);
  return (
    <Container
      imageBackground={Background}
      headerTitle={i18n.t('app-settings.title')}
      isHeaderVisible
      goBackNavigate={onBackPress}
    >
      <ScrollView>
        <Box marginHorizontal="spacing-m">
          <BiometrySettings />
        </Box>
      </ScrollView>
    </Container>
  );
};

export default AppSettings;
