import { createSlice } from '@reduxjs/toolkit'

const initialState = {active: false,}

export const premiereClassSlice = createSlice({
    name: 'premiereClass',
    initialState,
    reducers: {
        activatePremiereClass: (state) => { 
            state.active = true
        },
        deactivatePremiereClass: (state) => {
            state.active = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { activatePremiereClass, deactivatePremiereClass } = premiereClassSlice.actions

export default premiereClassSlice.reducer
  