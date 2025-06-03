import {customFetch} from "./Utils"

export async function getCatalogue(){
    const result = await customFetch("catalogue")
    
    return result
}

export async function getRecommendations(){
    const result = await customFetch("recommendations")
    return result
}

export async function getItem(id){
    const result = await customFetch(`catalogue/${id}`)
    return result
}

export async function updateCatalogue(editedItem, navigate){
    return await customFetch("catalogue",
        "PUT",
        {item: editedItem},
        navigate
    )
}
export async function generateReport(navigate, dateRange=null) {

    let params = ""
    if(dateRange){
        params = new URLSearchParams({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate
        })
    }
    
    return await customFetch(
        "report" + `?${params.toString()}`,
        "GET",
        null,
        navigate
    )
}

export async function addToCatalogue(newItem, navigate){
    return await customFetch("catalogue",
        "POST",
        {
            item: newItem
        },
        navigate
    )
}

export async function addReview(itemId, text, rating, navigate){
    return await customFetch(`catalogue/${itemId}/reviews`,
        "POST",
        {
            text: text,
            rating: rating,
        },
        navigate
    )
}
export async function deleteFromCatalogue(itemID, navigate){
    return await customFetch("catalogue",
        "DELETE",
        {
            _id: itemID
        },
        navigate
    )
}

