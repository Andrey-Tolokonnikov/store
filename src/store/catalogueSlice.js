import { createSlice } from '@reduxjs/toolkit'
import coat from './../img/coat.png'

const initialState = {
    items: [{ id: 1, title: "Название 1", price: 5000, img: coat, isFav: false, inCart:0 },
        { id: 2, title: "Название 2", price: 10000, isFav: true, inCart: 0 },
        { id: 3, title: "Название 3", price: 10000, isFav: false, inCart: 0 },
        { id: 4, title: "Название 4", price: 10000, isFav: false, inCart: 0 },
        { id: 5, title: "Название 5", price: 10000, isFav: false, inCart: 0 },
        { id: 6, title: "Название 6", price: 10000, isFav: false, inCart: 0 },
        { id: 7, title: "Название 7", price: 10000, isFav: false, inCart: 0 }]
}

const catalogueSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let found = false;
            state.items.forEach(item => {
                if (item.id === action.payload.id) {
                    item.inCart += 1;
                    found = true;
                }
            })
            if (!found) {
                state.items.push([action.payload, 1]);
            }
        },
        makeFav: (state, action) => {
            state.items.find(item => item.id === action.payload.id).isFav = true;
        },
        unmakeFav: (state, action) => {
            state.items.find(item => item.id === action.payload.id).isFav = false;
        },
        removeItem: (state, action) => {
            state.items.forEach(item => {
                if (item.id === action.payload.id) {
                    item.inCart -= 1;
                }
            })
        },
        clearItem: (state, action) => {
            state.items.forEach(item => {
                if (item.id === action.payload.id) {
                    item.inCart = 0;
                }
            })
        }
    }
});

export const { addToCart, removeItem, clearItem, makeFav, unmakeFav } = catalogueSlice.actions
export default catalogueSlice.reducer
