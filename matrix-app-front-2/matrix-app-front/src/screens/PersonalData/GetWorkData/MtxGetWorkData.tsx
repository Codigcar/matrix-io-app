import React from 'react';
import { View, Platform } from 'react-native';
import { NavigationPropsType } from 'src/types/types';
import { Container, Box, Text, TextInput, Button, fonts } from 'src/matrix-ui-components';
import { Form } from 'src/components/Form';
import { Background } from 'assets/images';
import { i18n } from 'src/utils/core/MTXStrings';
import MtxText from 'libs/ui-toolkit/components/mtx-text/MtxText';
import MtxSwitch from 'libs/ui-toolkit/components/mtx-switch/MtxSwitch';
import MtxDivider from 'libs/ui-toolkit/components/mtx-divider/MtxDivider';
import useGetWorkData from './hooks/useGetWorkData';
import styles from './styles/GetWorkDataStyle';
import {
  FIELD_OCCUPATION_MAX_LENGTH,
  FIELD_PROFESSION_MAX_LENGTH,
  FIELD_WORK_PLACE_MAX_LENGTH,
} from 'src/utils/constants';

const ios = Platform.OS === 'ios';
const MtxGetWorkData = (props: NavigationPropsType) => {
  const { route } = props;
  const { fromLogin } = route.params;
  const { onPressContinue, control, errors, onBackPress } = useGetWorkData(props);
  return (
    <Container
      withInput
      isHeaderVisible={false}
      isScrollable
      imageBackground={Background}
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
        validateOnMount
      >
        {({ handleSubmit, values, isValid, handleChange, setFieldValue, isSubmitting }) => (
          <Box flex={1} mx="spacing-m">
            <MtxDivider height={40} />
            <Text variant="H3" fontFamily={fonts.euclidCircularSemibold}>
              {i18n.t('get-work-data-title')}
            </Text>
            <MtxDivider height={16} />
            <TextInput
              containerProps={{ marginBottom: 'spacing-s' }}
              label={i18n.t('get-work-data-input-occupation')}
              placeholder={i18n.t('get-work-data-input-occupation-placeholder')}
              value={values.occupation}
              error={errors.occupation}
              autoCapitalize="none"
              onChangeText={handleChange('occupation')}
              maxLength={FIELD_OCCUPATION_MAX_LENGTH}
            />
            <MtxDivider height={10} />
            <TextInput
              containerProps={{ marginBottom: 'spacing-s' }}
              label={i18n.t('get-work-data-input-profession')}
              placeholder={i18n.t('get-work-data-input-profession-placeholder')}
              value={values.profession}
              error={errors.profession}
              autoCapitalize="none"
              onChangeText={handleChange('profession')}
              maxLength={FIELD_PROFESSION_MAX_LENGTH}
            />
            <MtxDivider height={10} />
            <TextInput
              containerProps={{ marginBottom: 'spacing-s' }}
              label={i18n.t('get-work-data-input-workplace')}
              placeholder={i18n.t('get-work-data-input-workplace-placeholder')}
              value={values.workPlace}
              error={errors.workPlace}
              autoCapitalize="none"
              onChangeText={handleChange('workPlace')}
              maxLength={FIELD_WORK_PLACE_MAX_LENGTH}
            />
            <MtxDivider height={44} />
            <View style={styles.switchBox}>
              <MtxText style={styles.switchBoxTitle}>
                {i18n.t('get-work-data-switch-box-title')}
              </MtxText>
              <MtxText style={styles.switchTitle}>{i18n.t('get-work-data-switch-label')}</MtxText>
              <MtxDivider height={8} />
              <View style={styles.switchRowContainer}>
                <MtxText
                  style={[styles.switchLabel, !values.livesInPeru && styles.switchLabelSelected]}
                >
                  {i18n.t('get-work-data-switch-label-no')}
                </MtxText>
                <MtxSwitch
                  size={ios ? 'md' : 'lg'}
                  name="livesInPeru"
                  control={control}
                  defaultIsChecked
                  onToggle={() => setFieldValue?.('livesInPeru', !values.livesInPeru)}
                />
                <MtxText
                  style={[styles.switchLabel, values.livesInPeru && styles.switchLabelSelected]}
                >
                  {i18n.t('get-work-data-switch-label-yes')}
                </MtxText>
              </View>
            </View>
            <MtxDivider height={173} />
            <Button
              variant={isValid ? 'primary' : 'disabled'}
              mb="spacing-m"
              label={i18n.t('button-label-continue')}
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </Box>
        )}
      </Form>
    </Container>
  );
};

export default MtxGetWorkData;
