export async function getUsers(){
    return await fetch("http://localhost:3001/users", 
        {   method: "GET",
            credentials: "include"
        }).then(res=>{
        if(res.status === 401){
            throw "Not authorized"
        } else if(res.status === 403){
            throw "Not enough rights"
        }else{
            return res.json()
        }
    })
}