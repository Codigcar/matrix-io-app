import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';
import { wp } from 'src/utils/sizes';

const styles = EStyleSheet.create({
  container: {
    width: wp(45),
    height: '346rem',
  },
  containerSkeleton: {
    borderColor: colors.PRIMARY_LIGHT,
    borderTopLeftRadius: '24rem',
    borderBottomLeftRadius: '24rem',
    paddingHorizontal: '24rem',
    paddingTop: '27rem',
    paddingBottom: '35rem',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: colors.WHITE,
  },
  backgroundStyle: {
    width: '175rem',
    height: '346rem',
    borderTopLeftRadius: '24rem',
    borderBottomLeftRadius: '24rem',
    paddingHorizontal: '24rem',
    paddingTop: '24rem',
    paddingBottom: '35rem',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  infoRowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontWeight: '400',
    fontSize: '12rem',
    lineHeight: '15.22rem',
  },
  infoButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -5,
  },
  numbersContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberBackground: {
    position: 'absolute',
    width: '135%',
  },
  infoButtonsSeparator: {
    flex: 1,
  },
  consumedTitle: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontWeight: '400',
    fontSize: '14rem',
    lineHeight: '17.75rem',
  },
  consumedValue: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontWeight: '600',
    fontSize: '20rem',
    lineHeight: '25.36rem',
  },
  liquidImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  infoButtonPressable: {
    padding: '2rem',
  },
  cvvRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cvvRowTitle: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_MEDIUM,
    fontWeight: '500',
    fontSize: '13rem',
    lineHeight: '16.48rem',
    color: colors.PRIMARY_DARK,
  },
  cvvRowValue: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_MEDIUM,
    fontWeight: '500',
    fontSize: '16rem',
    lineHeight: '20.29rem',
    color: colors.LABEL,
  },
  userNameLabel: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_MEDIUM,
    fontWeight: '500',
    fontSize: '12rem',
    lineHeight: '16.8rem',
    color: colors.LABEL,
    maxWidth: '70rem',
  },
  cardNumberLabel: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontWeight: '400',
    fontSize: '20rem',
    lineHeight: '25.36rem',
    color: colors.LABEL,
  },
});

export default styles;
