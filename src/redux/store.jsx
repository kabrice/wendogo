import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalslice'
import { userApi } from '../store/apis/userApi'
import { leadstatusApi } from '../store/apis/leadstatusApi'
import { leadApi } from '../store/apis/leadApi'
import spinnerReducer from './spinnerslice'
import userLevelSlice from './userLevelSlice'
import userReducer from './userslice'
//import { twilioApi } from '../store/apis/userIpApi'
import { visaTypeApi } from '../store/apis/visaTypeApi'
import {schoolYearApi} from '../store/apis/schoolYearApi'
import { levelApi } from '../store/apis/levelApi'
import { bacApi } from '../store/apis/bacApi'
import { countryApi } from '../store/apis/countryApi'
import { degreeApi } from '../store/apis/degreeApi'
import simulationStepSlice from './simulationStepSlice'
import {levelValueApi} from '../store/apis/levelValueApi'
import { spokenLanguageApi } from '../store/apis/spokenLanguageApi'
import { academicYearOrganizationApi } from '../store/apis/academicYearOrganizationApi'
import { markSystemApi } from '../store/apis/markSystemApi'
import { subjectWeightSystemApi } from '../store/apis/subjectWeightSystemApi'

export const store = configureStore({
  reducer: {
    subsModal : modalReducer,
    spinner : spinnerReducer,
    userLevelSlice : userLevelSlice,
    user: userReducer,
    simulationStep: simulationStepSlice,
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
    [subjectWeightSystemApi.reducerPath]: subjectWeightSystemApi.reducer
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
})
