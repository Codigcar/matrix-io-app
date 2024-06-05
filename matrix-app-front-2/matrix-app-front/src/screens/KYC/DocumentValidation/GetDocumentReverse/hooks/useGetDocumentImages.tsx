import { NavigationPropsType } from 'src/types/types';
import navigationScreenNames from 'src/utils/navigationScreenNames';

const useGetDocumentReverse = (props: NavigationPropsType) => {
  const {
    route: { params },
    navigation,
  } = props;
  const { documentFrontUrl } = params;

  const onMediaCaptured = (originalPath: string, cropPath: string) => {
    const saveUrlPayload = { original: originalPath, crop: cropPath };
    navigation.navigate(navigationScreenNames.documentReversePreview, {
      documentReverseUrl: saveUrlPayload,
      documentFrontUrl,
    });
  };

  return {
    onMediaCaptured,
  };
};

export default useGetDocumentReverse;
