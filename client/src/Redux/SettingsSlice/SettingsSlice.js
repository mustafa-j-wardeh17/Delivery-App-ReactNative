import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Color: 0
}

export const SettingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setColor: (state, action) => {
            state.Color = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setColor } = SettingsSlice.actions


export default SettingsSlice.reducer