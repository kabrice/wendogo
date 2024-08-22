import { createSlice } from '@reduxjs/toolkit';

const simulationStepSlice = createSlice({
    name: 'simulationStep',
    initialState: 0,
    reducers: {
        incrementStep: (state) => state + 1,
        decrementStep: (state) => state - 1,
        setStep: (state, action) => action.payload,
    },
});

export const { incrementStep, decrementStep, setStep } = simulationStepSlice.actions;

export default simulationStepSlice.reducer;
