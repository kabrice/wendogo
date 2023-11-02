import { createSlice } from '@reduxjs/toolkit'

const initialState = {phone: null}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserPhone: (state, action) => {
            state.phone = action.payload
            //return state
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUserPhone } = userSlice.actions

export default userSlice.reducer
  