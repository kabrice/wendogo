import { createSlice } from '@reduxjs/toolkit'

// const initialState = {user: null}

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload }; // Merge the updated fields
        },
        resetUser: () => null,
    },
})

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
  