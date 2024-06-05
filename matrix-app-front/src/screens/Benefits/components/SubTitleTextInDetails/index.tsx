import React from 'react';
import { Text } from 'matrix-ui-components';

interface SubTitleTextInDetailsProps {
  text: string | undefined;
}

const SubTitleTextInDetails = (props: SubTitleTextInDetailsProps) => {
  const { text } = props;
  return (
    <Text textAlign="left" variant="SubTitle18SemiBold" numberOfLines={2} color="primary1000">
      {text}
    </Text>
  );
};

export default SubTitleTextInDetails;
