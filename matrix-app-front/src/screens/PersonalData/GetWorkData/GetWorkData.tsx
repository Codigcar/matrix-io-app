import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import {
  Container, Box, TextInput, Button, Text, Switch,
} from 'matrix-ui-components';
import { Form } from 'src/components/Form';
import { i18n } from 'src/utils/core/MTXStrings';
import {
  FIELD_OCCUPATION_MAX_LENGTH,
  FIELD_PROFESSION_MAX_LENGTH,
  FIELD_WORK_PLACE_MAX_LENGTH,
} from 'src/utils/constants';
import { s, vs } from 'src/utils/sizes';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import useGetWorkData from './hooks/useGetWorkData';

const GetWorkData: React.FC<NavigationPropsType> = (props) => {
  const {
    onPressContinue, onBackPress, focusField, inputs,
  } = useGetWorkData(props);

  return (
    <BackgroundWrapper>
      <Container
        withInput
        isHeaderVisible
        isScrollable
        hasGradient={false}
        imageBackground="none"
        keyboardShouldPersistTaps="handled"
        headerTitle={i18n.t('get-work-data-title')}
        goBackNavigate={onBackPress}
      >
        <Form
          initialValues={{
            occupation: '',
            profession: '',
            workPlace: '',
            livesInPeru: true,
          }}
          onSubmit={onPressContinue}
          validateOnChange
        >
          {({
            handleSubmit, handleBlur, values, isValid, errors, handleChange, setFieldValue,
          }) => (
            <Box flex={1} m="spacing-m" justifyContent="space-between">
              <Box>
                <TextInput
                  containerProps={{ marginBottom: 'spacing-s' }}
                  label={i18n.t('get-work-data-input-occupation')}
                  placeholder={i18n.t('get-work-data-input-occupation-placeholder')}
                  value={values.occupation}
                  error={errors.occupation}
                  textHelper={errors.occupation}
                  onBlur={handleBlur('occupation')}
                  onSubmitEditing={() => { focusField('profession'); }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  testID="personal-work-data-occupation"
                  autoCapitalize="none"
                  onChangeText={handleChange('occupation')}
                  maxLength={FIELD_OCCUPATION_MAX_LENGTH}
                />
                <TextInput
                  containerProps={{ marginBottom: 'spacing-s' }}
                  label={i18n.t('get-work-data-input-profession')}
                  placeholder={i18n.t('get-work-data-input-profession-placeholder')}
                  value={values.profession}
                  error={errors.profession}
                  textHelper={errors.profession}
                  innerRef={(ref) => { inputs.current.profession = ref; }}
                  onBlur={handleBlur('profession')}
                  onSubmitEditing={() => { focusField('workPlace'); }}
                  blurOnSubmit={false}
                  testID="personal-work-data-profession"
                  autoCapitalize="none"
                  onChangeText={handleChange('profession')}
                  maxLength={FIELD_PROFESSION_MAX_LENGTH}
                />
                <TextInput
                  containerProps={{ marginBottom: 'spacing-s' }}
                  label={i18n.t('get-work-data-input-workplace')}
                  placeholder={i18n.t('get-work-data-input-workplace-placeholder')}
                  value={values.workPlace}
                  error={errors.workPlace}
                  textHelper={errors.workPlace ?? i18n.t('get-work-data-input-workplace-hint')}
                  innerRef={(ref) => { inputs.current.workPlace = ref; }}
                  testID="personal-work-data-workPlace"
                  onBlur={handleBlur('workPlace')}
                  autoCapitalize="none"
                  onChangeText={handleChange('workPlace')}
                  maxLength={FIELD_WORK_PLACE_MAX_LENGTH}
                />
                <Box borderRadius={24} my="spacing-m" p="spacing-s" backgroundColor="complementaryIndigo050">
                  <Text variant="Subtitle16pxMedium" mb="spacing-s">
                    {i18n.t('get-work-data-switch-box-title')}
                  </Text>
                  <Text variant="body13Regular" mb="spacing-xxs">
                    {i18n.t('get-work-data-switch-label')}
                  </Text>
                  <Box height={vs(48)} px="spacing-xs" borderRadius={s(25)} justifyContent="space-between" alignItems="center" width={s(130)} flexDirection="row" backgroundColor="primary000">
                    <Text variant="body">
                      {i18n.t('get-work-data-switch-label-no')}
                    </Text>
                    <Switch
                      label={i18n.t('get-work-data-switch-box-title')}
                      hideLabel
                      checked={values.livesInPeru}
                      onToggle={() => setFieldValue?.('livesInPeru', !values.livesInPeru)}
                    />
                    <Text variant="body">
                      {i18n.t('get-work-data-switch-label-yes')}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Button
                variant={isValid ? 'primary' : 'disabled'}
                label={i18n.t('button-label-continue')}
                testID="submit-work-data"
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </Box>
          )}
        </Form>
      </Container>
    </BackgroundWrapper>
  );
};

export default GetWorkData;
