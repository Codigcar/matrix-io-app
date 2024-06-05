/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-raw-text */
import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Slider, Divider } from 'native-base';
import MtxText from 'libs/ui-toolkit/components/mtx-text/MtxText';
// Assets
import { DollarCircle } from 'assets/icons';
// Styles
import { colors, fonts } from 'libs/ui-toolkit/styles';
import EStyleSheet from 'react-native-extended-stylesheet';

type DollarIconTypeProps = {
  label: string;
  size: number;
};
const styles = EStyleSheet.create({
  labelContainer: {
    marginBottom: '-14rem',
  },
  valueTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  lineValueCurrency: {
    fontFamily: fonts.RECOLETA_BOLD,
    fontSize: '24rem',
    color: colors.SECONDARY_800,
    marginRight: '8rem',
  },
  lineValueLabel: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_BOLD,
    fontSize: '42rem',
    lineHeight: '42rem',
    fontWeight: '600',
    color: colors.LABEL,
  },
  thumbOutCircle: {
    width: '24rem',
    height: undefined,
    aspectRatio: 1,
    backgroundColor: colors.BACKGROUND_WELLCOME_TOP,
    borderRadius: '19rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbInnerCircle: {
    width: '8rem',
    height: undefined,
    aspectRatio: 1,
    backgroundColor: colors.FOURTH_TEXT,
    borderRadius: '19rem',
  },
  subtitle: {
    alignSelf: 'center',
    fontFamily: fonts.GRAPHIE_REGULAR,
    color: colors.ONSURFACE_500,
    fontSize: '14rem',
  },
  sliderContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  dollarIconContainer: {
    alignItems: 'center',
  },
  dollarIconLabel: {
    fontSize: '12rem',
    lineHeight: '15rem',
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontWeight: '400',
    color: colors.LABEL,
    marginBottom: '12rem',
  },
});
const DollarIcon = ({ label, size }: DollarIconTypeProps) => (
  <View style={styles.dollarIconContainer}>
    <MtxText style={styles.dollarIconLabel}>{label}</MtxText>
    <Image
      source={DollarCircle}
      resizeMode="contain"
      style={{ width: size, height: undefined, aspectRatio: 1 }}
    />
  </View>
);
const LineValueSlider = () => {
  const maxLineValue = 10000;
  const [lineValue, setLineValue] = useState<number>(maxLineValue / 2);
  return (
    <View>
      <View style={styles.labelContainer}>
        <View style={styles.valueTextContainer}>
          <MtxText style={styles.lineValueLabel}>S/</MtxText>
          <MtxText style={styles.lineValueLabel}>
            {`${lineValue.toLocaleString()}`}
          </MtxText>
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <DollarIcon label="Min." size={18} />
        <Slider
          defaultValue={50}
          minValue={10}
          size="md"
          width="74%"
          onChange={(v) => {
            setLineValue(Math.floor((v * maxLineValue) / 100));
          }}
        >
          <Slider.Track bg={colors.ONSURFACE_100}>
            <Slider.FilledTrack bg={colors.BACKGROUND_WELLCOME_TOP} />
          </Slider.Track>
          <Slider.Thumb borderWidth="0" bg="transparent">
            <View style={styles.thumbOutCircle}>
              <View style={styles.thumbInnerCircle} />
            </View>
          </Slider.Thumb>
        </Slider>
        <DollarIcon label="Max." size={24} />
      </View>
      <Divider my={1} thickness={0} />
    </View>
  );
};

export default LineValueSlider;
