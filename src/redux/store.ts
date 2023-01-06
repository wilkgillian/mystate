import { configureStore } from '@reduxjs/toolkit';
import sliceIbge from './sliceIbge';

const store = configureStore({
  reducer: {
    ibge: sliceIbge
  }
});

export default store;
