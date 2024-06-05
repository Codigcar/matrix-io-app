/* eslint-disable react-native/no-raw-text */
import React, { useState, useCallback } from 'react';
import { Text } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import CheckLinksInText from '../CheckLinksInText';

interface CheckIsFullTextVisibleProps {
  showFullText: boolean;
  text: string | undefined;
}

const CheckIsFullTextVisible = ({ showFullText, text = '' }: CheckIsFullTextVisibleProps) => {
  if (showFullText) return <CheckLinksInText text={text} />;
  return (
    <Text variant="body13Regular" color="primary500">
      <CheckLinksInText text={text.slice(0, 240)} />
      ...
    </Text>
  );
};

interface TextToggleInDetailsProps {
  text: string | undefined;
}

const TextToggleInDetails = ({ text }: TextToggleInDetailsProps) => {
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);

  const handleFullTextVisible = useCallback(
    () => setIsFullTextVisible(!isFullTextVisible),
    [isFullTextVisible],
  );

  const TextShowMore = isFullTextVisible
    ? i18n.t('benefits:show-less')
    : i18n.t('benefits:show-more');

  return (
    <Text>
      <CheckIsFullTextVisible showFullText={isFullTextVisible} text={text} />
      <Text
        variant="body13Regular"
        color="complementaryIndigo500"
        textDecorationLine="underline"
        onPress={handleFullTextVisible}
      >
        {TextShowMore}
      </Text>
    </Text>
  );
};

export default TextToggleInDetails;
