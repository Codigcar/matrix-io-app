import React from 'react';
import { View } from 'react-native';
import { NavigationPropsType } from 'src/types/types';
import { getString } from 'src/utils/core/MTXStrings';
import { LOGO_INTRO_LIVENESS_SIZE } from 'src/utils/constants';
import MtxButton from 'libs/ui-toolkit/components/mtx-button/MtxButton';
import MtxWrapper from 'src/utils/core/Wrapper/MtxWrapper';
import MtxText from 'libs/ui-toolkit/components/mtx-text/MtxText';
import MtxIcon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import MtxDivider from 'libs/ui-toolkit/components/mtx-divider/MtxDivider';
import CustomStatusBar from 'src/components/CustomStatusBar/CustomStatusBar';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import TimeChip from './components/TimeChip';
import useLivenessIntro from './hooks/useLivenessIntro';
import styles from './styles/MtxLivenessIntroStyles';

const MtxLivenessIntro = (props: NavigationPropsType) => {
  const { onPressContinue, isLoading, isOnboarding } = useLivenessIntro(props);
  return (
    <MtxWrapper>
      <View style={styles.container}>
        <CustomStatusBar theme="dark" />
        <View style={styles.imageAndTextContainer}>
          <View style={styles.cronoContainer}>
            <MtxIcon
              name="faceScan"
              width={LOGO_INTRO_LIVENESS_SIZE}
              height={LOGO_INTRO_LIVENESS_SIZE}
            />
            <MtxDivider height={32} />
            <TimeChip text={isOnboarding ? '08 SEG' : '03 SEG'} />
          </View>
          <MtxDivider height={54} />
          {isOnboarding ? (
            <>
              <MtxText style={styles.title}>
                {getString('kyc-liveness-intro-titles-prepare')}
              </MtxText>
              <MtxDivider height={8} />
              <MtxText style={styles.subTitle}>
                {getString('kyc-liveness-intro-titles-make-a-video')}
              </MtxText>
            </>
          ) : (
            <>
              <MtxText style={styles.title}>
                {getString('seed.liveness.intro.title-regular')}
              </MtxText>
              <MtxText style={styles.subTitle}>
                {getString('seed.liveness.intro.title-bold')}
              </MtxText>
            </>
          )}
          <MtxDivider height={24} />
          <MtxText style={styles.disclousure}>
            {getString(
              isOnboarding ? 'kyc-liveness-intro-titles-disclosure' : 'seed.liveness.intro.message',
            )}
          </MtxText>
        </View>
        <View style={styles.buttonContainer}>
          <MtxButton
            label={getString(
              isOnboarding ? 'kyc-liveness-intro-start' : 'seed.liveness.intro.start',
            )}
            onPress={onPressContinue}
          />
        </View>
        <MtxDivider height={32} />
        <LoadingIndicator isVisible={isLoading} />
      </View>
    </MtxWrapper>
  );
};

export default MtxLivenessIntro;
