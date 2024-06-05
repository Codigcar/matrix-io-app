import React from "react";
import { Pressable } from "native-base";
import { Notification } from "assets/svgs";
import { Box, Text } from "matrix-ui-components";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from 'react-native-responsive-fontsize';
import { InboxRoutesEnum } from "src/shared/enums/routes/inbox-routes.enum";
import styles from "./notification-counter.styles";
import useNotificationsCounter from "./notification-counter.presenter";

const NotificationCounter = () => {

  const navigation = useNavigation();
  const { notifications } = useNotificationsCounter();
  const goToNotification = () => navigation.navigate(InboxRoutesEnum.NOTIFICATION_STACK);
  
  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Pressable style={styles.iconButtonContainer} onPress={goToNotification}>
            {notifications > 0 && (
              <Box
                backgroundColor="errorMedium"
                borderRadius={50}
                position="absolute"
                left={20}
                top={0}
                zIndex={1}
                paddingHorizontal="spacing-xxxs"
                style={styles.badgeContainer}
              >
                <Text
                  color="white"
                  variant="label"
                  fontSize={RFValue(8.75)}
                  textAlign="center"
                  letterSpacing={0.5}
                  style={styles.badge}
                  lineHeight={RFValue(9.75)}
                >
                  {notifications > 99 ? '99+' : notifications}
                </Text>
              </Box>
            )}
            <Notification />
          </Pressable>
        </Box>
      </Box>
  )
}

export default NotificationCounter;