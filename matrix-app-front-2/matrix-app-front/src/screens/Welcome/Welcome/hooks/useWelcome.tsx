import { checkValue } from 'src/utils/AsyncStorageHandler';
import { navigationRef } from 'src/navigators/RootNavigation';
import { getValueDecrypt } from 'src/utils/CryptoDataHandler';
import { CommonActions } from '@react-navigation/native';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';

const useOnboarding = () => {
  const handleRegisterPress = () => navigationRef.current?.navigate(AuthRoutesEnum.SIGN_UP_STACK);

  const handleLoginPress = async () => {
    const response = await checkValue('dni');
    if (response) {
      const value = await getValueDecrypt('dni');
      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: AuthRoutesEnum.AUTH_STACK,
              state: {
                routes: [
                  {
                    name: AuthRoutesEnum.SIGN_IN,
                    params: { identitySaved: value },
                  },
                ],
              },
            },
          ],
        }),
      );
    } else {
      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: AuthRoutesEnum.AUTH_STACK }],
        }),
      );
    }
  };
  return {
    handleRegisterPress,
    handleLoginPress,
  };
};

export default useOnboarding;
