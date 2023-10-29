import { configureStore } from '@reduxjs/toolkit'
import basketSlice from './CartSlice/basketSlice'
import resturantSlice from './ResturantSlice/ResturantSlice'
import SettingsSlice from './SettingsSlice/SettingsSlice'

export const store = configureStore({
    reducer: {
        basket: basketSlice,
        resturant: resturantSlice,
        settings:SettingsSlice,
    },
})