import React, {useEffect, useReducer} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {IPublication} from '../interfaces/publish.interface';

import {dataReducer} from './dataReducer';
import {fetchPublications} from '../api/fetchPublications';
import {DataContext} from './dataContext';

export interface IDataState {
  last_user: number,
  publications: IPublication[];
}

export const DATA_INITIAL_STATE: IDataState = {
  last_user: 1,
  publications: [],
};

// @ts-ignore
export const DataProvider: FC<any> = ({children}) => {
  const [state, dispatch] = useReducer(dataReducer,DATA_INITIAL_STATE);
  
  const key = "[state]";

  const setStorage = async(key: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(key, value);
  }

  const getStorage = async(key: string): Promise<string | null> => {
    const data = await AsyncStorage.getItem(key);
    if(!data) {
      return null;
    }
    return data;
  }

  const removeStorage = async(key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  }

  useEffect(() => {
    initData()
    return () => {}
  }, [])

  useEffect(() => {
    persistData()
    return () => {}

  }, [state]);

  

  const initData = async() => {
    getFetchDataInit().then((data: IDataState) => {
      dispatch({type:'[Publication] - init', payload: {
            last_user: data.last_user,
            publications: data.publications
      }})
    })
    .catch((err:string) => {
      console.error({err});
    })
  }

  const getFetchDataInit = async() => {
    const data = await getStorage(key);
    const dataParse = data ? JSON.parse(data) : DATA_INITIAL_STATE;
    const { last_user, publications } = dataParse;

    if(publications.length > 0) {
      return {last_user, publications};
    } 

    const getPublications = await fetchPublications(1);
    return {last_user, publications: getPublications};
  }

  
  const persistData = async() => {
    await setStorage(key, JSON.stringify(state));
  }
  
  const resetData = async() => {
    await dispatch({type:'[Publication] - init', payload: DATA_INITIAL_STATE})
  }

  const getNextPublication = async(): Promise<{hasError: boolean; message: string; data: IPublication[]}> => {
    if(state.last_user > 4) {
      return {
        hasError: false,
        message: '',
        data: [],
      };
    }
    const last_user = state.last_user + 1;
    const getPublications = await fetchPublications(last_user);

    dispatch({type:'[Publication] - AddPublications', payload: {
      last_user: last_user,
      publications: getPublications
    }})

    return {
      hasError: false,
      message: '',
      data: getPublications,
    };
  };

  return (
    <DataContext.Provider
      value={{
        ...state,

        // Methods
        getNextPublication,
        resetData,
        initData,
        getStorage,
        setStorage,
        removeStorage
      }}>
      {children}
    </DataContext.Provider>
  );
};
