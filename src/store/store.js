import { configureStore } from "@reduxjs/toolkit"
import catalogueSlice from "./catalogueSlice"
import profileSlice from "./profileSlice.js"

export const store = configureStore({
    reducer: { catalogue: catalogueSlice,
        profile: profileSlice }
})
