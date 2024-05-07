const express = require("express")
const mongo = require("./DAO/mongo.js")
const {saveImageFromBase64} = require("./fsHandlers/ImageHandler.js")
const cookie = require("cookie-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const {authFilter} = require("./filters/authFilter.js")
const {adminFilter} = require("./filters/adminFilter.js")
const bodyParser = require("body-parser")

require("dotenv").config()

const app = express()

let DAO = new mongo(process.env.DB_URL)

app.use(cors({origin: process.env.CLIENT_URL,
	credentials: true}))

app.use(cookie())
app.use(bodyParser.json({limit: "10mb"}))
app.use(express.static(process.env.PUBLIC_DIR))
app.use(authFilter)



app.post("/auth", async(req, res)=>{
	const user = await DAO.getUser(req.body.login, req.body.password)
	if(!user){
		res.sendStatus(401)
	}
	if(user.isBlocked){
		res.sendStatus(403)
	}
	else{
		res.cookie(process.env.TOKEN_NAME, 
			jwt.sign({
				login: user.login, 
				role: user.role
			},

			process.env.TOKEN_SECRET, 
			
			{
				expiresIn: 60 * 60 * 24, 
				algorithm: process.env.TOKEN_ALGORITHM
			}
			))
		res.json({
			login: user.login,
			_id: user._id,
			name: user.name,
			role: user.role,
			cart: user.cart,
			favorites: user.favorites
		})
	}
})

app.get("/catalogue", async (req, res)=>{
	const catalogue = await DAO.getCatalogue()
	res.json(catalogue)
})

app.put("/catalogue", async (req, res)=>{
	const editedItem = req.body.item
	let imgRef = null
	if(editedItem.img){
		imgRef = saveImageFromBase64(editedItem.img)
		editedItem.imgRef = process.env.SERVER_URL + "/"+ imgRef
		delete editedItem.img
	}

	await DAO.updateCatalogue(editedItem)
	const result = await DAO.getCatalogue()
	res.json(result)
})

app.post("/catalogue", async (req, res)=>{
	const newItem = req.body.item
	let imgRef = null
	if(newItem.img){
		imgRef = saveImageFromBase64(newItem.img)
	}

	newItem.imgRef = imgRef && process.env.SERVER_URL + "/"+ imgRef
	delete newItem.img

	await DAO.addToCatalogue(newItem)
	const result = await DAO.getCatalogue()
	res.json(result)
})

app.delete("/catalogue", async (req, res)=>{
	const itemID = req.body._id

	await DAO.deleteFromCatalogue(itemID)
	const result = await DAO.getCatalogue()
	res.json(result)
})

app.put("/cart", async (req, res)=>{
	const itemID = req.body._id
	const addMode = req.body.toAdd
	if(addMode){
		await DAO.addToCart(req.body.user.login, itemID)
	}else{
		await DAO.removeOneFromCart(req.body.user.login, itemID)
	}
	const cart = await DAO.getCart(req.body.user.login)
	res.json(cart)
})

app.put("/favs", async (req, res)=>{
	const itemID = req.body._id
	const addMode = req.body.toAdd
	if(addMode){
		await DAO.addToFavs(req.body.user.login, itemID)
	}else{
		await DAO.removeFromFavs(req.body.user.login, itemID)
	}
	const favs = await DAO.getFavs(req.body.user.login)
	res.json(favs)
})

app.get("/users", adminFilter, async(req, res)=>{
	const users = await DAO.getUsers()
	res.json(users)
})

app.put("/users", adminFilter, async (req, res)=>{
	const userID = req.body._id
	const action = req.body.action
	switch(action){
	case "block":{
		const blockMode = req.body.toBlock
		await DAO.setUserBlocked(userID, blockMode)
		const users = await DAO.getUsers()
		res.json(users)
		break
	} 
	case "role":{
		const roleToSet = req.body.role
		if(!["admin", "moder", "user"].includes(roleToSet)){
			res.sendStatus(406)
			return
		}
		await DAO.setUserRole(userID, roleToSet)
		const users = await DAO.getUsers()
		res.json(users)
		break
	}
	}
	
})

app.get("/users/me", async (req, res)=>{
	const login = req.body.user.login
	const user = await DAO.getUserByLogin(login)
	res.json(user)
})

app.listen(process.env.PORT, () => {
	DAO.connect()
})