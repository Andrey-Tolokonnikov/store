import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: []
}

const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action)=>{
            state.items = action.payload
        },
        addOrder: (state, action)=>{
            state.items.push(action.payload)
        },
        removeOrder: (state, action)=>{
            state.items = state.items.filter(item=>item._id=== action.payload)
        }
    }
})

export const {setOrders, addOrder, removeOrder} = OrdersSlice.actions
export default OrdersSlice.reducer
