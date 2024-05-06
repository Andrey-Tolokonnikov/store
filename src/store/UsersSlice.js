import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    usersList: []
}

const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action){
            console.log("users")
            state.usersList = action.payload
        }
    }
})

export const { setUsers } = UsersSlice.actions
export default UsersSlice.reducer