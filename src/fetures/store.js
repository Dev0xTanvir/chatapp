import { configureStore } from '@reduxjs/toolkit'
import friendReducer from '../fetures/slice/friendSlice'
export const store = configureStore({
   reducer: {
    friend: friendReducer,
  },
})