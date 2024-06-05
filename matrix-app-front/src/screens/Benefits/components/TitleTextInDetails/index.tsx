import React from 'react';
import { Text } from 'matrix-ui-components';

interface TitleTextInDetailsProps {
  text: string | undefined;
}

const TitleTextInDetails = (props: TitleTextInDetailsProps) => {
  const { text } = props;
  return (
    <Text textAlign="left" variant="Subtitle24Bold" numberOfLines={2} color="primary1000">
      {text}
    </Text>
  );
};

export default TitleTextInDetails;
