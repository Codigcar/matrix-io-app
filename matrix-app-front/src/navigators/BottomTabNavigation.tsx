import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRemoteConfigGetValue, RemoteConfigParams } from 'src/shared/providers/remote-config';
import { colors } from 'libs/ui-toolkit/styles';
// Screens
import PhysicalCard from 'src/screens/RequestCard/Main/screens/PhysicalCard';
import { Box, TabBarButton } from 'matrix-ui-components';
import { TabBarButtonProps } from 'src/matrix-ui-components/components/tab-bar-button/types';
import { analyticsManagerProvider, AnalyticsProviderType } from 'src/shared/providers/analytics/index';
import SupportSoon from 'src/screens/Soon/SupportSoon';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import BenefitsSoon from 'src/screens/Soon/BenefitsSoon';
import PhysicalCardSoon from 'src/screens/Soon/PhysicalCardSoon';
import useModalSoon from 'src/screens/Soon/hooks/useModalSoon';
import { ThemeProvider } from '@shopify/restyle';
import { useSelector } from 'react-redux';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { i18n } from 'src/utils/core/MTXStrings';
import { EventArg } from '@react-navigation/native';
import { DelinquentContext } from 'src/store/states/delinquentContext';
import { NotificationContext } from 'src/shared/contexts';
import BenefitsStack from 'src/screens/Benefits/index.router';
import NavigatorAnalytics from './analytics/navigators.analytics';
import CustomTabBar from './components/CustomTabBar';
import CustomerCare from '../screens/CustomerCare/CustomerCare';
import Home from '../screens/Home/Main/Home';

const Tab = createBottomTabNavigator();
const { height } = Dimensions.get('screen');

const defaultConfig = {
  headerShown: false,
  tabBarStyle: {
    height: height * 0.11,
  },
  tabBarShowLabel: false,
  tabBarActiveTintColor: colors.LABEL,
  tabBarInactiveTintColor: colors.PRIMARY_LIGHT,
};

const tabBarIcon =
  ({ label, iconName, hasAlert, analyticsAlert }: Partial<TabBarButtonProps>) =>
  ({ focused, color }: { focused: boolean; color: string }) =>
    (
      <TabBarButton
        color={color}
        focused={focused}
        iconName={iconName ?? 'home'}
        label={label ?? ''}
        size="normal"
        hasAlert={hasAlert}
        analyticsAlert={analyticsAlert}
      />
    );

const accountState = (state: any) => state.session.accountState;

const BottomTabNavigation = () => {
  const { value } = useRemoteConfigGetValue(RemoteConfigParams.physicalCardAlert);
  const { soonModal, setSoonModal, closeSoonModal } = useModalSoon();
  const { cardTabBadge, updateCardTabBadge } = useContext(NotificationContext);
  const accountCanceled = useSelector(accountState) !== 'AVAILABLE';
  const { sections } = useContext(DelinquentContext);
  const isDelinquentCanceled = sections.find((item) => item.code === 'MENU')?.itemsReduced;

  const tabPressOverrideForModal = (
    e: EventArg<'tabPress', true, undefined>,
    modalName: string,
  ) => {
    e.preventDefault();
    setSoonModal(modalName);
  };

  const tabPressWrapper = (label: string, action?: Function) => {
    NavigatorAnalytics.onTabPress(label);
    if (label === i18n.t('menu.card')) updateCardTabBadge(false);
    action?.();
  };

  return (
    <Box flex={1} backgroundColor="transparent">
      <Tab.Navigator
        screenOptions={defaultConfig}
        tabBar={(props) => CustomTabBar(props, accountCanceled || isDelinquentCanceled)}
      >
        <Tab.Screen
          name={navigationScreenNames.tabHome}
          component={Home}
          listeners={{
            tabPress: () => tabPressWrapper(i18n.t('menu.home')),
          }}
          options={{
            tabBarLabel: i18n.t('menu.home'),
            tabBarIcon: tabBarIcon({ label: i18n.t('menu.home'), iconName: 'home' }),
          }}
        />
        {!accountCanceled && !isDelinquentCanceled && (
          <Tab.Screen
            name={navigationScreenNames.tabBenefits}
            component={BenefitsStack}
            listeners={{
              tabPress: () => tabPressWrapper(i18n.t('menu.benefits')),
            }}
            options={{
              tabBarLabel: i18n.t('menu.benefits'),
              tabBarIcon: tabBarIcon({ label: i18n.t('menu.benefits'), iconName: 'benefit' }),
            }}
          />
        )}
        {!accountCanceled && !isDelinquentCanceled && (
          <Tab.Screen
            name={navigationScreenNames.tabCard}
            component={PhysicalCard}
            listeners={{
              tabPress: () => tabPressWrapper(i18n.t('menu.card')),
            }}
            options={{
              tabBarStyle: { display: 'none' },
              tabBarLabel: i18n.t('menu.card'),
              tabBarIcon: tabBarIcon({
                label: i18n.t('menu.card'),
                iconName: 'card',
                hasAlert: cardTabBadge,
                analyticsAlert: value?.asBoolean(),
              }),
            }}
          />
        )}
        <Tab.Screen
          name={navigationScreenNames.tabSupport}
          component={CustomerCare}
          listeners={{
            tabPress: () => tabPressWrapper(i18n.t('menu.customer-care')),
          }}
          options={{
            tabBarStyle: { display: 'none' },
            tabBarLabel: i18n.t('menu.customer-care'),
            tabBarIcon: tabBarIcon({ label: i18n.t('menu.customer-care'), iconName: 'chat' }),
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
      <ThemeProvider theme={rebrandingTheme}>
        <BenefitsSoon
          onClose={closeSoonModal}
          isVisible={soonModal === navigationScreenNames.tabBenefits}
        />
        <PhysicalCardSoon
          onClose={closeSoonModal}
          isVisible={soonModal === navigationScreenNames.tabCard}
        />
        <SupportSoon
          onClose={closeSoonModal}
          isVisible={soonModal === navigationScreenNames.tabSupport}
        />
      </ThemeProvider>
    </Box>
  );
};

export default BottomTabNavigation;
