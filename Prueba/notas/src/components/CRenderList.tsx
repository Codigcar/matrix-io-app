import React from 'react';
import {FlatList, RefreshControl } from 'react-native';
import {CRenderItem} from './CRenderItem';
import PropTypes from 'prop-types';
import {CTextCenter} from './CTextCenter';

type Props = {
  data: any;
  pullRefresh: () => Promise<void>;
  isLoadingPullRefresh: boolean;
  loadMore?: (() => void) | null;
  timeEndReached?: number | null;
};

export const CRenderList = ({
  data,
  loadMore = null,
  timeEndReached = null,
  pullRefresh,
  isLoadingPullRefresh,
}: Props) => {
  return (
    <FlatList
      testID='flat-list'
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <CRenderItem {...item} />}
      onEndReached={loadMore}
      onEndReachedThreshold={timeEndReached}
      refreshControl={
        <RefreshControl
          refreshing={isLoadingPullRefresh}
          onRefresh={pullRefresh}
          tintColor={'red'}
          colors={['red']}
          testID={'refresh-control'}
        />
      }
      contentContainerStyle={{flexGrow: 1}}
      ListEmptyComponent={() => {
        return <CTextCenter title="Publicaciones no encontradas" />;
      }}
    />
  );
};

CRenderList.propTypes = {
  data: PropTypes.array.isRequired,
  pullRefresh: PropTypes.func.isRequired,
  isLoadingPullRefresh: PropTypes.bool.isRequired,
  loadMore: PropTypes.func,
  timeEndReached: PropTypes.number,
};
