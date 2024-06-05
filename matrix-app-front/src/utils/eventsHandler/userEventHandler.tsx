import { useNavigation } from '@react-navigation/native';
import events, { onboardingStates } from './eventList';
import { resetNavigationToScreen } from '../navigationHandler';

const useEventHandler = () => {
  const navigation = useNavigation();
  const mainStack = 'Enrollment';

  const goTo = (eventName: string) => {
    const currentEvent = events.find((event) => event.name === eventName);
    // Delete when add new events
    if (eventName === onboardingStates.onboardingCompleted) {
      resetNavigationToScreen(navigation, ['BottomTabNavigator']);
    } else if (currentEvent) {
      const stackNavigation: string[] = currentEvent.stack === mainStack
        ? [currentEvent.stack, currentEvent?.screen]
        : [mainStack, currentEvent.stack, currentEvent?.screen];
      resetNavigationToScreen(navigation, stackNavigation, currentEvent.params);
    }
  };

  return {
    goTo,
  };
};

export default useEventHandler;
