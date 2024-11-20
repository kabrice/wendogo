import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalslice'
import { userApi } from '../store/apis/userApi'
import { leadstatusApi } from '../store/apis/leadstatusApi'
import { leadApi } from '../store/apis/leadApi'
import spinnerReducer from './spinnerslice'
import universityReducer from './universitySlice'
import errorPageSlice from './errorPageSlice'
import userReducer, { setUser } from './userSlice';
import premiereClassSlice from './premiereClassSlice'
import { visaTypeApi } from '../store/apis/visaTypeApi'
import {schoolYearApi} from '../store/apis/schoolYearApi'
import { levelApi } from '../store/apis/levelApi'
import { bacApi } from '../store/apis/bacApi'
import { countryApi } from '../store/apis/countryApi'
import { degreeApi } from '../store/apis/degreeApi'
import simulationStepSlice from './simulationStepSlice'
import progressBarStepSlice from './progressBarStepSlice'
import {levelValueApi} from '../store/apis/levelValueApi'
import { spokenLanguageApi } from '../store/apis/spokenLanguageApi'
import { academicYearOrganizationApi } from '../store/apis/academicYearOrganizationApi'
import { markSystemApi } from '../store/apis/markSystemApi'
import { subjectWeightSystemApi } from '../store/apis/subjectWeightSystemApi'
import { nationalityApi } from '../store/apis/nationalityApi'
import { schoolApi } from '../store/apis/schoolApi'
import { majorApi } from '../store/apis/majorApi'  
import helper from '../utils/Helper';

let store;

export function initializeStore(preloadedState = undefined) {
  return configureStore({
    reducer: {
      subsModal : modalReducer,
      spinner : spinnerReducer,
      premiereClass : premiereClassSlice,
      user: userReducer,
      simulationStep: simulationStepSlice,
      errorPage: errorPageSlice,
      university: universityReducer,
      progressBarStep: progressBarStepSlice,
      [userApi.reducerPath]: userApi.reducer,
      [leadstatusApi.reducerPath]: leadstatusApi.reducer,
      [leadApi.reducerPath]: leadApi.reducer,
      [visaTypeApi.reducerPath]: visaTypeApi.reducer,
      [schoolYearApi.reducerPath]: schoolYearApi.reducer,
      //[twilioApi.reducerPath]: twilioApi.reducer
      [levelApi.reducerPath]: levelApi.reducer,
      [bacApi.reducerPath]: bacApi.reducer,
      [countryApi.reducerPath]: countryApi.reducer,
      [degreeApi.reducerPath]: degreeApi.reducer,
      [levelValueApi.reducerPath]: levelValueApi.reducer,
      [spokenLanguageApi.reducerPath]: spokenLanguageApi.reducer,
      [academicYearOrganizationApi.reducerPath]: academicYearOrganizationApi.reducer,
      [markSystemApi.reducerPath]: markSystemApi.reducer,
      [subjectWeightSystemApi.reducerPath]: subjectWeightSystemApi.reducer,
      [nationalityApi.reducerPath]: nationalityApi.reducer,
      [schoolApi.reducerPath]: schoolApi.reducer,
      [majorApi.reducerPath]: majorApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
                                            .concat(leadstatusApi.middleware)
                                            .concat(leadApi.middleware)
                                            .concat(visaTypeApi.middleware)
                                            .concat(schoolYearApi.middleware)
                                            .concat(levelApi.middleware)
                                            .concat(bacApi.middleware)
                                            .concat(countryApi.middleware)
                                            .concat(degreeApi.middleware)
                                            .concat(levelValueApi.middleware)
                                            .concat(spokenLanguageApi.middleware)
                                            .concat(academicYearOrganizationApi.middleware)
                                            .concat(markSystemApi.middleware)
                                            .concat(subjectWeightSystemApi.middleware)
                                            .concat(nationalityApi.middleware)
                                            .concat(schoolApi.middleware)
                                            .concat(majorApi.middleware)
  })
}

export function getStore() {
  if (typeof window === 'undefined') {
    // Server-side: Always create a new store
    return initializeStore();
  }
  
  // Client-side: Create store if it doesn't exist
  if (!store) {
    store = initializeStore();
    // Initialize store with local storage data on client side only
    const userData = helper.getLocalStorageWithExpiration('wendogouser');
    if (userData) {
      console.log('🚀 userData:', userData);
      store.dispatch(setUser(userData));
    }
  }
  
  return store;
}

export { store };
