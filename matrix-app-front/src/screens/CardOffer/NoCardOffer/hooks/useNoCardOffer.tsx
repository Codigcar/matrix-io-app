import { NavigationPropsType } from 'src/types/types';
import { BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from 'src/utils/auth/states/signInStates';
import { SignOut } from 'src/api/AuthServices';
import useOnboarding from 'src/screens/Welcome/Welcome/hooks/useWelcome';

const useNoCardOffer = (props: NavigationPropsType) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { handleLoginPress } = useOnboarding();

  const goToWelcome = () => {
    handleLoginPress();
  };

  const onPressContinue = () => {
    SignOut();
    dispatch(logout());
    goToWelcome();
    BackHandler.exitApp();
  };

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  return {
    onPressContinue,
    onPressBackArrow,
  };
};

export default useNoCardOffer;
