import React from 'react';
import { Box, Text } from 'src/matrix-ui-components';
import { Pressable } from 'react-native';
import { formatDate } from 'src/utils/date-time/date-time';
import { textLengthAccording } from 'src/utils/string';
import { i18n } from 'src/utils/core/MTXStrings';
import { TOTAL_LENGTH } from 'src/utils/constants';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { SwipeableProps } from 'react-native-gesture-handler/lib/typescript/components/Swipeable';
import { TrashIcon } from 'assets/svgs';

interface CardNotificationProps extends SwipeableProps {
  title: string;
  date: string;
  isRead: boolean;
  onPress: () => void;
  onRemovePress: () => void;
  innerRef?: React.LegacyRef<Swipeable>;
}

const CardNotification: React.FC<CardNotificationProps> = ({
  title,
  date,
  isRead,
  onPress,
  onRemovePress,
  innerRef,
  ...props
}) => {
  const rightSwipeActions = () => (
    <Pressable onPress={onRemovePress}>
      <Box
        flex={1}
        borderRadius={16}
        backgroundColor="FeedbackError050"
        justifyContent="center"
        alignItems="center"
        ml="spacing-xxs"
        px="spacing-xxs"
        py="spacing-xxm"
      >
        <Box
          height={40}
          width={40}
          borderRadius={20}
          backgroundColor="FeedbackError100"
          justifyContent="center"
          alignItems="center"
        >
          <TrashIcon />
        </Box>
      </Box>
    </Pressable>
  );

  return (
    <GestureHandlerRootView>
      <Swipeable ref={innerRef} renderRightActions={rightSwipeActions} {...props}>
        <Pressable onPress={onPress}>
          <Box borderRadius={16} backgroundColor="primary100" p="spacing-s">
            <Box flexDirection="row">
              {!isRead ? (
                <Box
                  width={8}
                  height={8}
                  borderRadius={8}
                  backgroundColor="complementaryIndigo600"
                  mr="spacing-xxs"
                  mt="spacing-xxxs"
                />
              ) : null}
              <Box flex={1}>
                <Text variant={isRead ? 'body13Regular' : 'body13Medium'} testID='see-more-notification'>
                  {textLengthAccording(title, TOTAL_LENGTH, '... ')}
                  {title.length > TOTAL_LENGTH && (
                    <Text variant={isRead ? 'body13Regular' : 'body13Medium'} color="primary500">
                      {i18n.t('notification.seeMore')}
                    </Text>
                  )}
                </Text>
                <Text variant="body12" mt="spacing-xxs" color="primary700" testID='notification-date'>
                  {formatDate(date, 'DD MMM YYYY [a las] hh:mm a')}
                </Text>
              </Box>
            </Box>
          </Box>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

CardNotification.defaultProps = {
  innerRef: undefined,
};

export default CardNotification;
