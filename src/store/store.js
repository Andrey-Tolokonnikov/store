import { configureStore } from "@reduxjs/toolkit"
import CatalogueSlice from "./CatalogueSlice"
import ProfileSlice from "./ProfileSlice.js"
import UsersSlice from "./UsersSlice.js"

export const store = configureStore({
    reducer: { 
        catalogue: CatalogueSlice,
        profile: ProfileSlice,
        users: UsersSlice
    }
})
