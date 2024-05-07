import {customFetch} from "./Utils"

export async function getCatalogue(){
    const result = await customFetch("http://localhost:3001/catalogue")
    
    return result
}

export async function updateCatalogue(editedItem, navigate){
    return await customFetch("http://localhost:3001/catalogue",
        "PUT",
        {item: editedItem},
        navigate
    )
}

export async function addToCatalogue(newItem, navigate){
    return await customFetch("http://localhost:3001/catalogue",
        "POST",
        {
            item: newItem
        },
        navigate
    )
}
export async function deleteFromCatalogue(itemID, navigate){
    return await customFetch("http://localhost:3001/catalogue",
        "DELETE",
        {
            _id: itemID
        },
        navigate
    )
}

