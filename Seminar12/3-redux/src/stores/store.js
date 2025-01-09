import { configureStore, createStore } from '@reduxjs/toolkit';

import reducer from '../reducers'

// const store = configureStore({reducer});
const store = createStore(reducer)

export default store