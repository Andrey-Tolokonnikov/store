import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    login: "",
    name: "",
    _id: "",
    cart: [],
    favs: []
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let found = false
            state.cart.forEach(item => {
                if (item._id === action.payload._id) {
                    item.num += 1
                    found = true
                }
            })
            if (!found) {
                state.cart.push({_id: action.payload._id, num: 1})
            }
        },
        setCart(state, action){
            state.cart = action.payload.cart
        },
        setFavs(state, action){
            state.favs = action.payload 
        },
        setName: (state, action)=>{
            state.name = action.payload
        },
        setLoginState: (state, action)=>{
            state.login = action.payload
        },
        setRole: (state, action)=>{
            state.role = action.payload
        },
        makeFav: (state, action) => {
            state.favs.push(action.payload._id)
        },
        unmakeFav: (state, action) => {
            state.favs = state.favs.filter(item=>item.id !== action.payload._id)
        },
        setID: (state, action) =>{
            state._id = action.payload
        },
        removeItem: (state, action) => {
            state.cart.forEach(item => {
                if (item._id === action.payload._id) {
                    item.num = Math.max(0, item.num-1)
                }
            })
            state.cart = state.cart.filter(item=>item.num>0)
        },
        clearItem: (state, action) => {
            state.cart.forEach(item => {
                if (item._id === action.payload._id) {
                    item.inCart = 0
                }
            })

            state.cart = state.cart.filter(item=>item.inCart>0)
        }
    }
})

export const { setCart,setFavs,setID, setRole, addToCart,setName, setLoginState, removeItem, clearItem, makeFav, unmakeFav } = profileSlice.actions
export default profileSlice.reducer