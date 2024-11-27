async function checkResForErrors(promise){
    return promise.then(res=>{
        if(res.status === 401){
            throw "Not authorized"
        } else if(res.status === 403){
            throw "Not enough rights"
        }
        else{
            return res.json()
        }
    })
}

export async function customFetch(href, method = "GET", body, navigate = null){
    try{
        return await checkResForErrors(
            fetch(
                "http://localhost:3001/" + href, 
                {   method: method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: body && JSON.stringify(body),
                    credentials: "include"
                }
            )
        )
    } catch(err){
        if(navigate != null){
            navigate("/auth")
        }
        return null
    }
}
