import createSagaMiddleware from '@redux-saga/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import reducers from './rootReducers';
import rootSaga from './sagas/rootSagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const persistConfig = {
  key: 'matrixRootPersistor',
  storage: AsyncStorage,
  whitelist: ['welcome'],
};

if (__DEV__ && process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line global-require
  // const createDebugger = require('redux-flipper').default;
  // middlewares.push(createDebugger());
}

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [...middlewares],
});
sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>
