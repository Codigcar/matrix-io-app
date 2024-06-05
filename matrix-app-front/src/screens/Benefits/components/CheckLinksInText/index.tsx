import React from 'react';
import { Text } from 'matrix-ui-components';
import { Linking } from 'react-native';

interface LinkTextProps {
  url: string;
  text: string;
}

const LinkText = (props: LinkTextProps) => {
  const { url, text } = props;
  return (
    <Text
      variant="body13Regular"
      color="complementaryIndigo500"
      textDecorationLine="underline"
      textAlign="center"
      onPress={() => Linking.openURL(url)}
    >
      {text}
    </Text>
  );
};

const regexCheckURL = /((https?:\/\/)[^\s]+)/g;
const regexEndsWithPunctuation = /[.,?]$/;

/** Function to check Links in text.
 * @name: checkLinksInText
 * @param: {string} text
 * @example: checkLinksInText(text) => JSX.Element
 */

interface CheckLinksInTextProps {
  text: string | undefined;
}

const CheckLinksInText = (props: CheckLinksInTextProps) => {
  const { text } = props;
  if (!text) return null;

  const textWithLinks = text.split(regexCheckURL);
  textWithLinks.forEach((item: any, index: number) => {
    if (regexCheckURL.test(item) && regexEndsWithPunctuation.test(item)) {
      const getLastCharacter = item[item.length - 1];
      textWithLinks[index] = item.slice(0, -1);
      textWithLinks[index + 1] = getLastCharacter + textWithLinks[index + 1];
    }
  });

  const removeLastSlash = (textToRemoveLastSlash: string) => (textToRemoveLastSlash.endsWith('/') ? textToRemoveLastSlash.slice(0, -1) : textToRemoveLastSlash);
  return (
    <Text textAlign="left" variant="body13Regular" color="primary500">
      {textWithLinks.map((item: any, index: number) => {
        const textWithoutHttp = item.replaceAll('https://', '');
        const textWithoutLastSlash = removeLastSlash(textWithoutHttp);
        if (regexCheckURL.test(item)) {
          return <LinkText key={Number(index)} text={textWithoutLastSlash} url={item} />;
        }
        return textWithoutHttp;
      })}
    </Text>
  );
};

export default CheckLinksInText;
