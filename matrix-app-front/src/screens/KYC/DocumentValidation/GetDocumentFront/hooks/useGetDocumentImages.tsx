import { NavigationPropsType } from 'src/types/types';
import navigationScreenNames from 'src/utils/navigationScreenNames';

const useGetDocumentImages = (props: NavigationPropsType) => {
  const { navigation } = props;

  const onMediaCaptured = (originalPath: string, cropPath: string) => {
    const saveUrlPayload = { original: originalPath, crop: cropPath };
    navigation.navigate(navigationScreenNames.documentFrontPreview, {
      documentFrontUrl: saveUrlPayload,
    });
  };
  return {
    onMediaCaptured,
  };
};

export default useGetDocumentImages;
