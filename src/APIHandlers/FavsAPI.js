export async function addToFavs(itemId){
    return await fetch("http://localhost:3001/favs", 
        {   method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: itemId,
                toAdd: true,
            }),
            credentials: "include"
        }).then(res=>{
        if(res.status === 401){
            throw "Not authorized"
        }else{
            return res.json()
        }
    })
}
export async function removeFromFavs(itemId){
    return await fetch("http://localhost:3001/favs", 
        {   method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: itemId,
                toAdd: false
            }),
            credentials: "include"
        }).then(res=>{
        if(res.status === 401){
            throw "Not authorized"
        }else{
            return res.json()
        }
    })
}