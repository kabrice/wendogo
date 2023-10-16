import { createSlice } from '@reduxjs/toolkit'

const initialState = {
                        open: false,
                        }

export const subsModalSlice = createSlice({
    name: 'subsModal',
    initialState,
    reducers: {
        open: (state) => {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})    
            state.open = true
        },
        close: (state) => {
            state.open = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { open, close } = subsModalSlice.actions

export default subsModalSlice.reducer
  