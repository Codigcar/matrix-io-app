import React from 'react';
import {View, Platform} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {SearchBarBaseProps} from 'react-native-elements/dist/searchbar/SearchBar';
import PropTypes from 'prop-types';

 export const CSearchBar = ({
  dataList,
  search,
  setSearch,
  setFilteredDataSource,
}: any) => {
  const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = dataList.filter(function (item: any) {
        const itemData = item.title;
        return itemData.indexOf(text) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(dataList);
      setSearch(text);
    }
  };

  return (
    <View>
      <SafeSearchBar
        containerStyle={styles.containerBarraBusqueda}
        inputContainerStyle={styles.estiloBarraBusqueda}
        onChangeText={(text: string) => searchFilterFunction(text)}
        onClear={() => searchFilterFunction('')}
        placeholder="Buscar por título..."
        value={search}
        platform={'android'}
        clearIcon={true}
        testID={'search'}
      />
    </View>
  );
};

export const styles = {
  containerBarraBusqueda: {
    backgroundColor: '#fff',
    borderTopColor: '#FFF',
    borderBottomColor: '#FFF',
    paddingHorizontal: 0,
    marginRight: 20,
    ...Platform.select({
      ios: {
        paddingVertical: 0,
        borderRadius: 10,
      },
    }),
  },
  estiloBarraBusqueda: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 0,
    ...Platform.select({
      ios: {},
      android: {
        marginLeft: 15,
        marginRight: 15,
        shadowOpacity: 0.39,
        shadowRadius: 13.97,
        elevation: 11,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
};

CSearchBar.propTypes = {
  dataList: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setFilteredDataSource: PropTypes.func.isRequired,
}
