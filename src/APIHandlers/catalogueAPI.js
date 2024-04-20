export async function getCatalogue(){
    return await fetch("http://localhost:3001/catalogue", 
        {
            credentials: "include"
        }).then(res=>{
        return res.json() 
    }
    )
}