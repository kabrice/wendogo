import { createSlice } from '@reduxjs/toolkit'

const initialState = {active: false,}

export const universitySlice = createSlice({
    name: 'university',
    initialState,
    reducers: {
        activateUniversity: (state) => { 
            state.active = true
        },
        deactivateUniversity: (state) => {
            state.active = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { activateUniversity, deactivateUniversity } = universitySlice.actions

export default universitySlice.reducer
  