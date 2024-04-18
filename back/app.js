const express = require("express")
const mongo = require("./mongo.js")
const cookie = require("cookie-parser")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
const port = 3001
const url = "mongodb://127.0.0.1:27017/"

let DAO = new mongo(url)

app.use(cors({origin: "http://localhost:3000",
	credentials: true}))
app.use(cookie("hello"))
app.use(bodyParser.json())
app.use(express.static("public"))


app.post("/auth", async(req, res)=>{
	const user = await DAO.getUser(req.body.login, req.body.password)
	if(user.length == 0){
		res.sendStatus(403)
	}else{
		res.cookie("token","tokenValue")
		res.json(user[0])
	}
})

app.get("/catalogue", async (req, res)=>{
	const catalogue = await DAO.getCatalogue()
	res.json(catalogue)
})

app.put("/cart", async (req, res)=>{
	const itemID = req.body._id
	const addMode = req.body.toAdd
	if(addMode){
		await DAO.addToCart("login1", itemID)
	}else{
		await DAO.removeOneFromCart("login1", itemID)
	}
	res.sendStatus(200)
})
app.put("/cart", async (req, res)=>{
	const itemID = req.body._id
	const result = await DAO.addToCart("login1", itemID)
	console.log(result)
	res.json(result)
})
app.listen(port, () => {
	DAO.connect()
	console.log(`Example app listening on port ${port}`)
})