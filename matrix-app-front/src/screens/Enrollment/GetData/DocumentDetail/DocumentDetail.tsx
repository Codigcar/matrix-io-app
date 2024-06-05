import React from 'react';
import { Container } from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { PDFViewer } from 'src/components/PDFViewer/PDFViewer';

const DocumentDetail = (props: NavigationPropsType) => {
  const { navigation, route } = props;
  const { title, url, theme } = route.params;
  const onPressBackArrow = () => navigation.goBack();
  return (
    <BackgroundWrapper>
      <Container
        imageBackground="none"
        hasGradient={false}
        isHeaderVisible
        goBackNavigate={onPressBackArrow}
        headerTitle={title}
        theme={theme}
      >
        <PDFViewer url={url}/>
      </Container>
    </BackgroundWrapper>
  );
};

export default DocumentDetail;
