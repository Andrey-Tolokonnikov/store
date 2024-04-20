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
            state.items.push(action.payload)
        },
        clearCatalogue: (state)=>{
            state.items = []
        },
        setCatalogue: (state, action)=>{
            state.items = action.payload
        }
        // makeFav: (state, action) => {
        // 	state.items.find(item => item.id === action.payload.id).isFav = true
        // },
        // unmakeFav: (state, action) => {
        // 	state.items.find(item => item.id === action.payload.id).isFav = false
        // },
        // removeItem: (state, action) => {
        // 	state.items.forEach(item => {
        // 		if (item.id === action.payload.id) {
        // 			item.inCart = Math.max(0, item.inCart-1)
        // 		}
        // 	})
        // },
        // clearItem: (state, action) => {
        // 	state.items.forEach(item => {
        // 		if (item.id === action.payload.id) {
        // 			item.inCart = 0
        // 		}
        // 	})
        // }
    }
})

export const {setCatalogue, addToCatalogue, clearCatalogue} = catalogueSlice.actions
export default catalogueSlice.reducer
