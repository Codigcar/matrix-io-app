import React, { useState } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import {
  Card, Box, Container, Text,
} from 'src/matrix-ui-components';
import MtxIcon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import { i18n } from 'src/utils/core/MTXStrings';
import { formatDNI } from 'src/utils/obfuscated/ObfuscatedDataProfile';
import Helpers from 'src/utils/Helpers';
import {
  MoreDotsIcon,
  CardRemoveIcon,
  CardProfileBackground,
  UserSquare,
  Email,
  Mobile,
  Location,
} from 'assets/svgs';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { s, vs } from 'src/utils/sizes';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import ConfirmModal from 'src/components/confirm-modal';
import { NavigationPropsType } from 'src/types/types';
import LabelSkeleton from './components/SkeletonLabel';
import UserData from './components/UserData';
import useMyProfile from './hooks/useMyProfile';
import LogoutSkeleton from './components/SkeletonLogout';
import EmailData from './components/EmailData';
import ReferralBanner from './components/ReferralBanner';
import useMyProfilePresenter from './presenters/my-profile.presenter';

const MyProfile: React.FC<NavigationPropsType> = (props) => {
  const {
    useName,
    alias,
    phoneNumber,
    isLoading,
    address,
    email,
    documentNumber,
    maskData,
    signOut,
    goTo,
    isEmailVerified,
    getCancellationRequest,
    accountCanceled,
    isNotificationModalVisible,
    closeNotificationModal,
    handleNotificationModalButtonPress,
    isLoadingIndicator,
  } = useMyProfile();
  const {
    onPressBackArrow,
    onPressGoToReferralCode,
    enableReferralCode,
  } = useMyProfilePresenter(props);
  const [menuRight, setVisibleMenuRigth] = useState(false);

  return (
    <BackgroundWrapper>
      <Container
        isScrollable
        hasGradient={false}
        imageBackground="none"
        headerTitle={i18n.t('myProfile-title')}
        isHeaderVisible
        goBackNavigate={onPressBackArrow}
      >
        <Box justifyContent="flex-start">
          <Box
            justifyContent="center"
            mx="spacing-m"
            mb="spacing-xxs"
            height={vs(134)}
            backgroundColor={isLoading ? 'primary100' : 'primary1000'}
            borderRadius={16}
            mt="spacing-m"
          >
            {!isLoading ? (
              <Box position="absolute" width="100%" height="100%">
                <CardProfileBackground width="100%" height="100%" preserveAspectRatio="none" />
              </Box>
            ) : (
              <Box />
            )}
            <Box px="spacing-sm" justifyContent="center">
              {!isLoading ? (
                <Text
                  testID="FullName"
                  variant="Heading24Medium"
                  color="primary000"
                  mb="spacing-xxs"
                >
                  {useName}
                </Text>
              ) : (
                <Box>
                  <Box>
                    <LabelSkeleton width={s(83)} isVisible={isLoading} />
                  </Box>
                  <Box marginVertical="spacing-xxs">
                    <LabelSkeleton width={s(135)} isVisible={isLoading} />
                  </Box>
                </Box>
              )}
              {!isLoading ? (
                <Box flexDirection="row" alignItems="center">
                  <Text color="primary500" variant="bodySemibold" mr="spacing-xxs">
                    {i18n.t('myProfile-document')}
                  </Text>
                  <Text testID="dni" color="primary000" variant="body">
                    {formatDNI(documentNumber)}
                  </Text>
                </Box>
              ) : (
                <Box mt="spacing-xxs">
                  <LabelSkeleton width={s(105)} isVisible={isLoading} />
                </Box>
              )}
            </Box>
          </Box>
          {enableReferralCode && (
            <ReferralBanner
              mx="spacing-m"
              mb="spacing-s"
              isLoading={isLoading}
              onPress={onPressGoToReferralCode}
            />
          )}
          <Box mx="spacing-m">
            <UserData
              isLoading={isLoading}
              labelText="myProfile-label-alias"
              value={alias ? Helpers.capitalizeWord(alias) : '-'}
              action={() => goTo('Alias')}
              testID="alias"
              icon={UserSquare}
              isEditable={false}
            />
            <EmailData
              isEmailVerified={isEmailVerified}
              goTo={(path: string) => goTo(path)}
              isLoading={isLoading}
              icon={Email}
              value={email ? maskData(email, 'email', 2) : '-'}
              isEditable
            />
            <UserData
              isEmailVerified={isEmailVerified}
              isLoading={isLoading}
              labelText="myProfile-label-phone"
              value={phoneNumber ? maskData(phoneNumber, 'phone') : '-'}
              action={() => goTo('Phone')}
              testID="phone"
              icon={Mobile}
              isEditable
            />
            <UserData
              isLoading={isLoading}
              labelText="myProfile-label-address"
              value={address ? maskData(Helpers.capitalizeWord(address), 'address') : '-'}
              action={() => goTo('Address')}
              testID="address"
              icon={Location}
              isEditable
            />
          </Box>
          <Box mx="spacing-m" mt="spacing-m" mb="spacing-m">
            {!isLoading ? (
              <Pressable onPress={signOut} testID="signOut">
                <Box flexDirection="row">
                  <MtxIcon name="logout" size="normal" />
                  <Text ml="spacing-xxxxs" color="primaryDark" variant="body14SemiBold">
                    {i18n.t('myProfile-label-logout')}
                  </Text>
                </Box>
              </Pressable>
            ) : (
              <LogoutSkeleton isVisible={isLoading} />
            )}
          </Box>
        </Box>
        <ConfirmModal
          isVisible={isNotificationModalVisible}
          title={i18n.t('verifyPushEdition.notifications-modal.title')}
          description={i18n.t('verifyPushEdition.notifications-modal.description')}
          confirmButton={{
            label: i18n.t('verifyPushEdition.notifications-modal.confirm-button'),
            onPress: handleNotificationModalButtonPress,
          }}
          cancelButton={{
            label: i18n.t('verifyPushEdition.notifications-modal.close-button'),
            onPress: closeNotificationModal,
          }}
          type="warning"
        />
      </Container>
      {menuRight && (
        <Box right={s(24)} top={s(92)} position="absolute">
          <Card>
            <TouchableOpacity
              testID="cancel-account"
              onPress={() => {
                getCancellationRequest();
                setVisibleMenuRigth(false);
              }}
            >
              <Box>
                <Box flexDirection="row" alignItems="center">
                  <CardRemoveIcon />
                  <Text
                    textAlign="left"
                    paddingHorizontal="spacing-xxxs"
                    variant="body"
                    ml="spacing-xxxxxs"
                    color="complementaryPumpkin600"
                  >
                    {i18n.t('cancelAccount:cancelAccount.button')}
                  </Text>
                </Box>
                <Box justifyContent="center" alignItems="flex-start">
                  <Text
                    textAlign="left"
                    mt="spacing-xxxs"
                    variant="body12"
                    lineHeight={14}
                    color="primaryDark"
                  >
                    {i18n.t('cancelAccount:cancelAccount.subtitle-button')}
                  </Text>
                </Box>
              </Box>
            </TouchableOpacity>
          </Card>
        </Box>
      )}
      {!accountCanceled && (
        <Box right={s(24)} top={s(60)} position="absolute">
          <TouchableOpacity testID="menu-right" onPress={() => setVisibleMenuRigth(!menuRight)}>
            <MoreDotsIcon />
          </TouchableOpacity>
        </Box>
      )}
      <LoadingIndicator isVisible={isLoadingIndicator} />
    </BackgroundWrapper>
  );
};

export default MyProfile;
