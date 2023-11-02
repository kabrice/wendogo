import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalslice'
import { userApi } from '../store/apis/userApi'
import spinnerReducer from './spinnerslice'
import userReducer from './userslice'
//import { twilioApi } from '../store/apis/userIpApi'

export const store = configureStore({
  reducer: {
    subsModal : modalReducer,
    spinner : spinnerReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    //[twilioApi.reducerPath]: twilioApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
                                          //.concat(twilioApi.middleware)
})
