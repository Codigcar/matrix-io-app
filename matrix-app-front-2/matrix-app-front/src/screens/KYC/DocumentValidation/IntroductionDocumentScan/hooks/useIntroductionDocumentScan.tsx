import { Camera } from 'react-native-vision-camera';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { NavigationPropsType } from 'src/types/types';

const useIntroductionDocumentScan = ({ navigation }: NavigationPropsType) => {
  const goNextScreen = () => {
    logVirtualEventAnalytics({
      eventName: 'virtualEventApp07',
      seccion: 'Exito',
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: 'Continuar',
    });
    navigation.navigate('GetDocumentFront');
  };

  const onButtonPress = async () => {
    Camera.getCameraPermissionStatus().then(async (status) => {
      if (status === 'denied' || status === 'not-determined') {
        logVirtualEventAnalytics({
          seccion: 'Modal',
          tipoEvento: 'Visualizar',
          tipoElemento: 'Modal',
          valor: 'Solicitud permisos de camara',
        });
        const newCameraPermission = await Camera.requestCameraPermission();
        if (newCameraPermission === 'authorized') {
          goNextScreen();
        }
      } else {
        goNextScreen();
      }
    });
  };
  return {
    navigation,
    onButtonPress,
  };
};

export default useIntroductionDocumentScan;
