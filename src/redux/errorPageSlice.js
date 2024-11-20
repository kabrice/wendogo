import { createSlice } from '@reduxjs/toolkit'

const initialState = {active: false,}

export const errorPageSlice = createSlice({
    name: 'errorPage',
    initialState,
    reducers: {
        activateErrorPage: (state) => { 
            state.active = true
        },
        deactivateErrorPage: (state) => {
            state.active = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { activateErrorPage, deactivateErrorPage } = errorPageSlice.actions

export default errorPageSlice.reducer
  