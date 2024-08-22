import { createSlice } from '@reduxjs/toolkit'

const initialState = {isInUniversity: true}

export const userLevelSlice = createSlice({
    name: 'userLevel',
    initialState,
    reducers: {
        isInUniversity: (state) => { 
            state.isInUniversity = true
        },
        isInHighSchool: (state) => {
            state.isInUniversity = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { isInUniversity, isInHighSchool } = userLevelSlice.actions

export default userLevelSlice.reducer
  