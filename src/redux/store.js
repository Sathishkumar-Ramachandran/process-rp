import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers'; // Assuming reducers.js is in ./reducers

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
