import React from 'react';
// Components
import { Text, Box } from 'matrix-ui-components';
import Calendar from 'assets/svgs/calendar_request.svg';
import Clock from 'assets/svgs/clock.svg';
import Card from 'assets/svgs/card.svg';
import Danger from 'assets/svgs/danger_request.svg';
import { IconListItemPropsType, SvgByTypeProps } from '../../types/component';

const SvgByType = (props: SvgByTypeProps) => {
  const { type } = props;
  switch (type) {
    case 1:
      return <Calendar width={28} height={28} />;
    case 2:
      return <Clock width={28} height={28} />;
    case 4:
      return <Danger width={28} height={28} />;
    default:
      return <Card width={28} height={28} />;
  }
};

const IconListItem: React.FC<IconListItemPropsType> = (props) => {
  const {
    label, subtitle, hasValue, type, value, testID,
  } = props;
  return (
    <Box testID={testID} justifyContent="flex-start" flexDirection="row">
      <Box width={type === 4 ? '75%' : '100%'} justifyContent="flex-start" flexDirection="row">
        <Box>
          <SvgByType type={type} />
        </Box>
        <Box ml="spacing-xxs" width="80%" alignItems="flex-start">
          <Text
            textAlign="left"
            variant="body"
            numberOfLines={1}
            fontSize={type !== 4 ? 14 : 13}
            lineHeight={28}
            color="primaryDarkest"
          >
            {label}
          </Text>
          {!!subtitle && (
            <Text
              textAlign="left"
              mt="spacing-none"
              variant="body"
              numberOfLines={1}
              fontSize={13}
              lineHeight={15}
              color="primary500"
            >
              {subtitle}
            </Text>
          )}
        </Box>
      </Box>
      <Box width="30%" alignItems="flex-end">
        {hasValue && !!value ? (
          <Text
            textAlign="right"
            mx="spacing-xxxxs"
            paddingHorizontal="spacing-xxxs"
            variant="body"
            fontSize={13}
            fontWeight="bold"
            lineHeight={28}
            color="primaryDarkest"
          >
            {value}
          </Text>
        ) : (
          <Text />
        )}
      </Box>
    </Box>
  );
};

IconListItem.defaultProps = {
  subtitle: '',
  hasValue: false,
  type: 1,
};

export default IconListItem;
