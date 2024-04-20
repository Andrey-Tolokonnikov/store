export async function addToCart(itemId){
    return await fetch("http://localhost:3001/cart", 
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
        if(res.status === 403){
            throw "Not authorized"
        }else{
            return res.json()
        }
    })
}
export async function removeOneFromCart(itemId){
    return await fetch("http://localhost:3001/cart", 
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
        if(res.status === 403){
            throw "Not authorized"
        }else{
            return res.json()
        }
    })
}

