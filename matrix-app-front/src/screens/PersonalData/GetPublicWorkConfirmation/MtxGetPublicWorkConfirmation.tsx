import React from 'react';
import { View, Image, Platform } from 'react-native';
import { getString, i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { CheckGradient } from 'assets/icons';
import MtxText from 'libs/ui-toolkit/components/mtx-text/MtxText';
import MtxSwitch from 'libs/ui-toolkit/components/mtx-switch/MtxSwitch';
import MtxDivider from 'libs/ui-toolkit/components/mtx-divider/MtxDivider';
import { Container, Box, TextInput, Button } from 'matrix-ui-components';
import { Form } from 'src/components/Form';
import { Background } from 'assets/images';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import useGetPublicWorkConfirmation from './hooks/useGetPublicWorkConfirmation';
import styles from './styles/GetPublicWorkConfirmationStyle';
import {
  FIELD_EF_ORGANIZATION_NAME_MAX_LENGTH,
  FIELD_EF_POSITION_MAX_LENGTH,
} from 'src/utils/constants';

const checklistLabels = [
  {
    id: 'first',
    label: getString('get-work-confirmation-checklist-first'),
  },
  {
    id: 'second',
    label: getString('get-work-confirmation-checklist-second'),
  },
  {
    id: 'third',
    label: getString('get-work-confirmation-checklist-third'),
  },
];
const ios = Platform.OS === 'ios';

const MtxGetPublicWorkConfirmation = (props: NavigationPropsType) => {
  const { onPressContinue, control, isLoading, onBackPress } = useGetPublicWorkConfirmation(props);
  return (
    <Form
      initialValues={{
        extraFunctions: false,
        extraFunctionsOrganizationName: '',
        extraFunctionsPosition: '',
      }}
      onSubmit={onPressContinue}
      validateOnMount
    >
      {({ handleSubmit, values, isValid, handleChange, setFieldValue }) => (
        <Container
          withInput
          isHeaderVisible
          isScrollable={values.extraFunctions}
          imageBackground={Background}
          goBackNavigate={onBackPress}
        >
          <Box flex={1} mx="spacing-m">
            <MtxDivider height={23} />
            <MtxText style={styles.title}>{getString('get-work-confirmation-title')}</MtxText>
            <MtxDivider height={24} />
            <MtxText style={styles.subtitle}>{getString('get-work-confirmation-subtitle')}</MtxText>
            <MtxDivider height={16} />
            <View style={styles.switchBox}>
              {checklistLabels.map((item) => (
                <View key={item.id}>
                  <View style={styles.checklistRowContainer}>
                    <Image
                      source={CheckGradient}
                      style={styles.checklistIcon}
                      resizeMode="contain"
                    />
                    <MtxText style={styles.checklistLabel}>{item.label}</MtxText>
                  </View>
                  <MtxDivider height={22} />
                </View>
              ))}
              <MtxDivider height={36} />
              <MtxText style={styles.switchLabel}>
                {getString('get-work-data-switch-label')}
              </MtxText>
              <MtxDivider height={8} />
              <View style={styles.switchRowContainer}>
                <MtxText
                  style={[styles.switchLabel, !values.extraFunctions && styles.switchLabelSelected]}
                >
                  {getString('get-work-data-switch-label-no')}
                </MtxText>
                <MtxSwitch
                  size={ios ? 'md' : 'lg'}
                  name="extraFunctions"
                  control={control}
                  onToggle={() => {
                    setFieldValue?.('extraFunctions', !values.extraFunctions);
                    setFieldValue?.('extraFunctionsOrganizationName', '');
                    setFieldValue?.('extraFunctionsPosition', '');
                  }}
                />
                <MtxText
                  style={[styles.switchLabel, values.extraFunctions && styles.switchLabelSelected]}
                >
                  {getString('get-work-data-switch-label-yes')}
                </MtxText>
              </View>
            </View>
            {values.extraFunctions && (
              <View>
                <MtxDivider height={24} />
                <TextInput
                  containerProps={{ marginBottom: 'spacing-s' }}
                  label={i18n.t('get-work-confirmation-organization-name-label')}
                  placeholder={i18n.t('get-work-confirmation-organization-name-placeholder')}
                  value={values.extraFunctionsOrganizationName}
                  autoCapitalize="none"
                  onChangeText={handleChange('extraFunctionsOrganizationName')}
                  maxLength={FIELD_EF_ORGANIZATION_NAME_MAX_LENGTH}
                />
                <TextInput
                  label={i18n.t('get-work-confirmation-organization-position-label')}
                  placeholder={i18n.t('get-work-confirmation-organization-position-placeholder')}
                  value={values.extraFunctionsPosition}
                  autoCapitalize="none"
                  onChangeText={handleChange('extraFunctionsPosition')}
                  maxLength={FIELD_EF_POSITION_MAX_LENGTH}
                />
              </View>
            )}
            <MtxDivider height={30} />
            <View
              style={[
                styles.floatButtonContainer,
                values.extraFunctions && styles.normalButtonContainer,
              ]}
            >
              <Button
                variant={isValid || !values.extraFunctions ? 'primary' : 'disabled'}
                mb="spacing-m"
                label={i18n.t('button-label-continue')}
                onPress={handleSubmit}
                disabled={values.extraFunctions && !isValid}
              />
            </View>
          </Box>
          <LoadingIndicator isVisible={isLoading} />
        </Container>
      )}
    </Form>
  );
};

export default MtxGetPublicWorkConfirmation;
