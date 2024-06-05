/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import MtxWrapper from 'src/utils/core/Wrapper/MtxWrapper';

import { Divider, Radio } from 'native-base';
import { DEFAULT_SPACE_THIRD } from 'utils/constants';
import MtxLeftArrowIcon from 'src/components/LeftArrowIcon/MtxLeftArrowIcon';
import MtxText from 'libs/ui-toolkit/components/mtx-text/MtxText';
import { getString } from 'utils/core/MTXStrings';
import MtxButton from 'ui-toolkit/components/mtx-button/MtxButton';
import MtxCheckBox from 'libs/ui-toolkit/components/mtx-check-box/MtxCheckBox';
import { NavigationPropsType } from '../../../types/types';

import styles from './styles/MtxSelectPlanStyles';
import useGetPlans from './hooks/useGetPlans';

const MtxSelectPlan = (props: NavigationPropsType) => {
  const { onPressContinue, onPressBackArrow, plans } = useGetPlans(props);

  const renderPlan = (plan: any) => plan.map((value: any) => (
    <View style={styles.plansElement} key={value.id}>
      <MtxText style={styles.textNamePlan}>{value.plan}</MtxText>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.textPrice}>{value.price}</Text>
        <Text style={styles.textPeriod}>{value.period}</Text>
      </View>
    </View>
  ));

  return (
    <MtxWrapper>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Divider my={DEFAULT_SPACE_THIRD} thickness={0} />
          <MtxLeftArrowIcon dark onPress={onPressBackArrow} />
        </View>
        <Divider my={DEFAULT_SPACE_THIRD} thickness={0} />
        <View style={styles.spaceContainer}>
          <MtxText style={styles.titleSemiBold}>
            {getString('plans-title-detail')}
          </MtxText>
          <Divider my={2} thickness={0} />
          <MtxText style={styles.subTitleSemiBold}>
            {getString('plans-title-selected')}
          </MtxText>
        </View>
        <Divider my={2} thickness={0} />
        <View style={styles.plansView}>{renderPlan(plans)}</View>
        <View style={styles.bottomView}>
          <View style={styles.checkboxContainer}>
            {/* <MtxCheckBox name="termsAndConditionsPlans" /> */}
            <TouchableOpacity testID="documents-checkbox-link">
              <MtxText style={styles.checkLabel}>
                {getString('plans-declare-terms-first-step')}
                <MtxText style={styles.checkLabelSemiBold}>
                  {getString(
                    'plans-declare-terms-second-step',
                  )}
                </MtxText>
              </MtxText>
            </TouchableOpacity>
          </View>
          <Divider my={2} thickness={0} />
          <View style={styles.buttonContainer}>
            <MtxButton
              label={getString('plans-contract-plan')}
              onPress={onPressContinue}
              isDisabled
            />
          </View>
        </View>
      </View>
    </MtxWrapper>
  );
};

export default MtxSelectPlan;
