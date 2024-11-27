import {customFetch} from "./Utils"

export async function getOrdersAll(navigate){
    const result = await customFetch("orders/all", "GET", undefined, navigate)
    
    return result
}

export async function getMyOrders(navigate){
    const result = await customFetch("orders/me", "GET", undefined, navigate)
    
    return result
}

export async function addOrder(cart, userID, navigate){
    return await customFetch("orders",
        "POST",
        {
            cart: cart,
            userID: userID
        },
        navigate
    )
}

export async function deleteOrder(itemID, navigate){
    return await customFetch("orders",
        "DELETE",
        {
            _id: itemID
        },
        navigate
    )
}

export async function setOrderStatus(orderID, status, navigate){
    return await customFetch("orders",
        "PUT",
        {
            _id: orderID,
            status: status
        },
        navigate
    )
}
