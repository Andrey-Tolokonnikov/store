import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            let found = false;
            state.items.forEach(item => {
                if (item[0].id === action.payload.id) {
                    item[1] += 1;
                    found = true;
                }
            })
            if (!found) {
                state.items.push([action.payload, 1]);
            }
        },
        removeItem: (state, action) => {
            state.items.forEach(item => {
                if (item[0].id === action.payload.id) {
                    item[1] -= 1;
                    state.items = state.items.filter(item => item[1] !== 0)
                }
            })
        },
        clearItem: (state, action) => {
            state.items.forEach(item => {
                if (item[0].id === action.payload.id) {
                    item[1] = 0;
                    state.items = state.items.filter(item => item[1] !== 0)
                }
            })
        }
    }
});

export const { addItem, removeItem, clearItem } = cartSlice.actions
export default cartSlice.reducer
