import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalslice'

export const store = configureStore({
  reducer: {
    subsModal : modalReducer
  },
})
