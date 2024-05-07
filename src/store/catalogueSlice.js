import { createSlice } from "@reduxjs/toolkit"
// import { act } from "@testing-library/react"

const initialState = {
    items: []
}

const catalogueSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCatalogue: (state, action) => {
            state.items.unshift(action.payload)
        },
        clearCatalogue: (state)=>{
            state.items = []
        },
        setCatalogue: (state, action)=>{
            state.items = action.payload
        },
        deleteFromCatalogue: (state, action) =>{
            state.items = state.items.filter(item=>item._id != action.payload)
        }
    }
})

export const {setCatalogue, clearCatalogue, addToCatalogue, deleteFromCatalogue} = catalogueSlice.actions
export default catalogueSlice.reducer
