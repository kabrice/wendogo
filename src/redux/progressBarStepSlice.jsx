import { createSlice } from '@reduxjs/toolkit';

const progressBarStepSlice = createSlice({
    name: 'progressBarStep',
    initialState: 1,
    reducers: {
        // incrementStep: (state) => state + 1,
        // decrementStep: (state) => state - 1,
        setProgress: (state, action) => action.payload,
    },
});

export const {setProgress } = progressBarStepSlice.actions;

export default progressBarStepSlice.reducer;
