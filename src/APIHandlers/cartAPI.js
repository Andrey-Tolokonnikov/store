import { customFetch } from "./Utils"

export async function addToCart(itemId, navigate){
    return await customFetch(
        "cart", 
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
        "cart", 
        "PUT", 
        {
            _id: itemId,
            toAdd: false,
        },
        navigate
    )
}

export async function clearCart(navigate){
    return await customFetch(
        "cart", 
        "DELETE", 
        navigate
    )
}

