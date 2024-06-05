import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import {
  Container, Box, TextInput, Button, Text, Switch,
} from 'matrix-ui-components';
import { Form } from 'src/components/Form';
import Check from 'assets/svgs/tick-circle-indigo.svg';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import {
  FIELD_EF_ORGANIZATION_NAME_MAX_LENGTH,
  FIELD_EF_POSITION_MAX_LENGTH,
} from 'src/utils/constants';
import { s, vs } from 'src/utils/sizes';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import useGetPublicWorkConfirmation from './hooks/useGetPublicWorkConfirmation';

const checklistLabels = [
  {
    id: 'first',
    label: i18n.t('get-work-confirmation-checklist-first'),
  },
  {
    id: 'second',
    label: i18n.t('get-work-confirmation-checklist-second'),
  },
  {
    id: 'third',
    label: i18n.t('get-work-confirmation-checklist-third'),
  },
];

const GetPublicWorkConfirmation: React.FC<NavigationPropsType> = (props) => {
  const {
    onPressContinue, onBackPress, scrollRef, inputs, focusField,
  } = useGetPublicWorkConfirmation(props);

  return (
    <BackgroundWrapper>
      <Container
        withInput
        imageBackground="none"
        keyboardShouldPersistTaps="handled"
        isHeaderVisible
        isScrollable
        hasGradient={false}
        headerTitle={i18n.t('get-work-confirmation-title')}
        goBackNavigate={onBackPress}
        scrollRef={scrollRef}
      >
        <Form
          initialValues={{
            extraFunctions: false,
            extraFunctionsOrganizationName: '',
            extraFunctionsPosition: '',
          }}
          onSubmit={onPressContinue}
          validateOnChange
        >
          {({
            handleSubmit,
            values,
            isValid,
            errors,
            handleBlur,
            isSubmitting,
            handleChange,
            setFieldValue,
          }) => (
            <Box flex={1} m="spacing-m">
              <Text variant="Subtitle16pxMedium">{i18n.t('get-work-confirmation-subtitle')}</Text>
              <Box
                my="spacing-s"
                px="spacing-s"
                py="spacing-m"
                borderRadius={vs(24)}
                backgroundColor="complementaryIndigo050"
              >
                {checklistLabels.map((item) => (
                  <Box key={item.id} mb="spacing-xs" ml="spacing-xxs">
                    <Box flexDirection="row" alignItems="flex-start" pr="spacing-m">
                      <Box>
                        <Check />
                      </Box>
                      <Box flexDirection="column" alignSelf="center">
                        <Text ml="spacing-xxs" variant="body" color="complementaryIndigo900">
                          {item.label}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
                <Box ml="spacing-xxs" mt="spacing-xs">
                  <Text variant="body13Regular" mb="spacing-xxs">
                    {i18n.t('get-work-data-switch-label')}
                  </Text>
                  <Box
                    flexDirection="row"
                    height={vs(48)}
                    px="spacing-xs"
                    borderRadius={s(25)}
                    justifyContent="space-between"
                    alignItems="center"
                    width={s(130)}
                    backgroundColor="primary000"
                  >
                    <Text variant="body">{i18n.t('get-work-data-switch-label-no')}</Text>
                    <Switch
                      label={i18n.t('get-work-data-switch-label')}
                      hideLabel
                      checked={values.extraFunctions}
                      onToggle={() => {
                        setFieldValue?.('extraFunctions', !values.extraFunctions);
                        setFieldValue?.('extraFunctionsOrganizationName', '');
                        setFieldValue?.('extraFunctionsPosition', '');
                      }}
                    />
                    <Text variant="body">{i18n.t('get-work-data-switch-label-yes')}</Text>
                  </Box>
                </Box>
              </Box>
              {values.extraFunctions && (
                <Box>
                  <TextInput
                    containerProps={{ marginBottom: 'spacing-s' }}
                    label={i18n.t('get-work-confirmation-organization-name-label')}
                    placeholder={i18n.t('get-work-confirmation-organization-name-placeholder')}
                    value={values.extraFunctionsOrganizationName}
                    error={errors.extraFunctionsOrganizationName}
                    textHelper={errors.extraFunctionsOrganizationName}
                    onBlur={handleBlur('extraFunctionsOrganizationName')}
                    autoCapitalize="none"
                    onSubmitEditing={() => {
                      focusField('extraFunctionsPosition');
                    }}
                    blurOnSubmit={false}
                    autoFocus
                    onChangeText={handleChange('extraFunctionsOrganizationName')}
                    maxLength={FIELD_EF_ORGANIZATION_NAME_MAX_LENGTH}
                  />
                  <TextInput
                    label={i18n.t('get-work-confirmation-organization-position-label')}
                    placeholder={i18n.t('get-work-confirmation-organization-position-placeholder')}
                    value={values.extraFunctionsPosition}
                    error={errors.extraFunctionsPosition}
                    textHelper={errors.extraFunctionsPosition}
                    innerRef={(ref) => {
                      inputs.current.extraFunctionsPosition = ref;
                    }}
                    onBlur={handleBlur('extraFunctionsPosition')}
                    autoCapitalize="none"
                    onChangeText={handleChange('extraFunctionsPosition')}
                    maxLength={FIELD_EF_POSITION_MAX_LENGTH}
                  />
                </Box>
              )}
              <Box flex={1} justifyContent="flex-end" mt="spacing-m">
                <Button
                  variant={isValid || !values.extraFunctions ? 'primary' : 'disabled'}
                  testID="submit-public-work-confirmation"
                  label={i18n.t('button-label-continue')}
                  onPress={handleSubmit}
                  disabled={values.extraFunctions && !isValid}
                />
              </Box>
              <LoadingIndicator isVisible={!!isSubmitting} />
            </Box>
          )}
        </Form>
      </Container>
    </BackgroundWrapper>
  );
};

export default GetPublicWorkConfirmation;
