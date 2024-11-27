import { customFetch } from "./Utils"
export async function addToFavs(itemId, navigate){
    return await customFetch(
        "favs", 
        "PUT",
        {
            _id: itemId,
            toAdd: true,
        },
        navigate
    )
}
export async function removeFromFavs(itemId, navigate){
    return await customFetch(
        "favs", 
        "PUT",
        {
            _id: itemId,
            toAdd: false,
        },
        navigate
    )
}