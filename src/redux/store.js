import {createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const middlewares= [thunk, logger ];
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;