import { configureStore, applyMiddleware, createStore } from '@reduxjs/toolkit';

import reducer from '../reducers'

import promise from 'redux-promise-middleware';

// const store = configureStore({ reducer: reducer, middleware: () =>  [promise] });
const store = createStore(reducer, applyMiddleware(promise))

export default store