import {customFetch} from "./Utils"

export async function getUsers(){
    return await customFetch("http://localhost:3001/users")
}

export async function setUserBlocked(userID, toBlock){
    return await customFetch(
        "http://localhost:3001/users", 
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
        "http://localhost:3001/users", 
        "PUT",
        {
            _id: userID,
            role: role,
            action: "role"
        }
    )
}
export async function getMe(){
    return await customFetch("http://localhost:3001/users/me")
}