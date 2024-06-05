import React, {useContext, useState, useEffect, FC} from 'react';
import {View, StyleSheet} from 'react-native';

import {CTextCenter, CRenderList, CSearchBar} from '../components/index';
import {DataContext} from '../context/index';

const MainScreen: FC<any> = () => {
  const [search, setSearch] = useState<string>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>('');
  const [isLoadingPullRefresh, setIsLoadingPullRefresh] = useState(false);

  const {publications, getNextPublication, resetData, initData} =
    useContext(DataContext);

  const loadNextPublication = () => {
    getNextPublication();
  };

  const pullRefresh = async () => {
    await resetData();
    await initData();
    setSearch('');
  };

  // View

  if (publications === undefined) {
    return <CTextCenter title="Cargando..." />;
  }

  return (
    <View style={styles.container}>
      <CSearchBar
        dataList={publications}
        search={search}
        setSearch={setSearch}
        setFilteredDataSource={setFilteredDataSource}
      />

      <View style={styles.dataList}>
        {search.trim() === '' ? (
          <CRenderList
            data={publications}
            loadMore={loadNextPublication}
            timeEndReached={0.2}
            isLoadingPullRefresh={isLoadingPullRefresh}
            pullRefresh={pullRefresh}
          />
        ) : (
          <CRenderList
            data={filteredDataSource}
            isLoadingPullRefresh={isLoadingPullRefresh}
            pullRefresh={pullRefresh}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataList: {
    flex: 1,
  },
});

export default MainScreen;
