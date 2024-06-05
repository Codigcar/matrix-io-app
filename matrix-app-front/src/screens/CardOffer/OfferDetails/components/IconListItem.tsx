import React from 'react';
// Components
import { Text, fonts, Box } from 'matrix-ui-components';
import { CalendarSummary, ClockOffer } from 'assets/svgs';
import { s } from 'src/utils/sizes';

type IconListItemPropsType = {
  label: string;
  subtitle?: string;
  hasSubtitle?: boolean;
  type?: number;
};
const IconListItem = ({
  label,
  subtitle,
  hasSubtitle,
  type,
}: IconListItemPropsType) => (
  <Box alignItems="center" flexDirection="row">
    {type === 1 ? (
      <CalendarSummary width={s(24)} height={s(24)} />
    ) : (
      <ClockOffer width={s(24)} height={s(24)} />
    )}
    <Box>
      <Text
        textAlign="left"
        ml="spacing-xxxxxs"
        paddingHorizontal="spacing-xxxs"
        variant="body14Regular"
        fontFamily={fonts.euclidCircularRegular}
        color="primaryDarkest"
      >
        {label}
      </Text>
      {hasSubtitle && (
        <Text
          textAlign="left"
          my="spacing-xxs"
          ml="spacing-xxs"
          mr="spacing-s"
          variant="body14Regular"
          color="primaryDark"
        >
          {subtitle}
        </Text>
      )}
    </Box>
  </Box>
);

IconListItem.defaultProps = {
  subtitle: '',
  hasSubtitle: false,
  type: 1,
};

export default IconListItem;
