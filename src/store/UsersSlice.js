import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    usersList: []
}

const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action){
            state.usersList = action.payload
        }
    }
})

export const { setUsers } = UsersSlice.actions
export default UsersSlice.reducer