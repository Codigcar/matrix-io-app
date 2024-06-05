import { useDispatch } from 'react-redux';
import { resetNavigation } from 'src/utils/navigationHandler';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';
import { setSliderVisibility } from '../../states/welcomeState';

const useOnboarding = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleContinuePress = () => {
    dispatch(setSliderVisibility());
    resetNavigation(navigation, AuthRoutesEnum.AUTH_STACK);
  };
  return {
    handleContinuePress,
  };
};

export default useOnboarding;
