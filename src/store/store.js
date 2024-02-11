import { configureStore } from '@reduxjs/toolkit'
import catalogueSlice from './catalogueSlice'

export const store = configureStore({
    reducer: { catalogue: catalogueSlice }
});
