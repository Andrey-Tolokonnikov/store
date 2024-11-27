import {customFetch} from "./Utils"

export async function getUsers(){
    return await customFetch("users")
}

export async function setUserBlocked(userID, toBlock){
    return await customFetch(
        "users", 
        "PUT",
        {
            _id: userID,
            toBlock: toBlock,
            action: "block"
        }
    )
}

export async function setUserRole(userID, role){
    return await customFetch(
        "users", 
        "PUT",
        {
            _id: userID,
            role: role,
            action: "role"
        }
    )
}
export async function getMe(){
    return await customFetch("users/me")
}