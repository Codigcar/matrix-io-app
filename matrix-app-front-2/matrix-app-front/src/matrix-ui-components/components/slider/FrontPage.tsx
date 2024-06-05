import React, { FC, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { i18n } from 'src/utils/core/MTXStrings';
import ImageCached from 'src/matrix-ui-components/components/image';
import Tag from './Tag';
import Box from '../box';

interface FrontPageProps {
  channel: string[];
  benefit: string;
  image: string;
}

interface Props {
  item: FrontPageProps;
  imageLoadEnd?: (value: boolean) => void;
}

const FrontPage: FC<Props> = ({ item, imageLoadEnd }) => {
  const { image, channel, benefit } = item;
  const [readyToBeViewed, setReadyToBeViewed] = useState(false);

  const handleLoadEnd = () => {
    if (imageLoadEnd) imageLoadEnd(true);
    setReadyToBeViewed(true);
  };

  return (
    <Box>
      <Box opacity={readyToBeViewed ? 1 : 0}>
        <ImageCached
          source={{ uri: image, cache: 'default' }}
          height={200}
          borderRadius={24}
          onLoadEnd={handleLoadEnd}
        />
      </Box>

      {readyToBeViewed && (
        <Box flexDirection="row" justifyContent="space-between" mt="spacing-s">
          <Tag amount={benefit} fontWeight="700" fontSize={RFValue(16)} />
          <Box flexDirection="row">
            {channel?.map((nameChannel, index) => {
              if (index + 1 === channel.length) return <Tag mood={nameChannel} />;
              return (
                <>
                  <Tag mood={nameChannel} />
                  <Box ml="spacing-xxxs" />
                </>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FrontPage;
