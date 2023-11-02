import { createSlice } from '@reduxjs/toolkit'

const initialState = {active: false,}

export const spinnerSlice = createSlice({
    name: 'spinner',
    initialState,
    reducers: {
        activateSpinner: (state) => { 
            state.active = true
        },
        deactivateSpinner: (state) => {
            state.active = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { activateSpinner, deactivateSpinner } = spinnerSlice.actions

export default spinnerSlice.reducer
  