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
        }
    }
});

export const { addItem } = cartSlice.actions
export default cartSlice.reducer
