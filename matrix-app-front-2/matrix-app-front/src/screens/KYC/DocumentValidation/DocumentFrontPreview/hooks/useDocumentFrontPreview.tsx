import { NavigationPropsType } from 'src/types/types';
import navigationScreenNames from 'src/utils/navigationScreenNames';

const useDocumentFrontPreview = (props: NavigationPropsType) => {
  const {
    route: { params },
    navigation,
  } = props;
  const { documentFrontUrl } = params;

  const handleContinuePress = () => {
    navigation.navigate(navigationScreenNames.getDocumentReverse, {
      documentFrontUrl,
    });
  };

  const handleCancelPress = () => {
    navigation.goBack();
  };

  return {
    navigation,
    documentFrontUrl,
    handleContinuePress,
    handleCancelPress,
  };
};

export default useDocumentFrontPreview;
