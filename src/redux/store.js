import {createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './rootSaga';
import { persistStore } from 'redux-persist'


const sagaMiddleware = createSagaMiddleware()
export const middlewares= [thunk, sagaMiddleware, logger ];
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store) 

export default {
  store,
  persistor
};