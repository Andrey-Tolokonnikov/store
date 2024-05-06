import { createSlice } from "@reduxjs/toolkit"
// import { act } from "@testing-library/react"

const initialState = {
    items: []
}

const catalogueSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // addToCatalogue: (state, action) => {
        //     state.items.push(action.payload)
        // },
        clearCatalogue: (state)=>{
            state.items = []
        },
        setCatalogue: (state, action)=>{
            state.items = action.payload
        }
    }
})

export const {setCatalogue, clearCatalogue} = catalogueSlice.actions
export default catalogueSlice.reducer
