import { customFetch } from "./Utils"

export async function addToCart(itemId, navigate){
    return await customFetch(
        "http://localhost:3001/cart", 
        "PUT", 
        {
            _id: itemId,
            toAdd: true,
        },
        navigate
    )
}
export async function removeOneFromCart(itemId, navigate){
    return await customFetch(
        "http://localhost:3001/cart", 
        "PUT", 
        {
            _id: itemId,
            toAdd: false,
        },
        navigate
    )
}

