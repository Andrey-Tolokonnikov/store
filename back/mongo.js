const MongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId 

module.exports = class DAO{
	url
	mongoClient
	db
	constructor(url){
		this.url = url
		this.mongoClient = new MongoClient(this.url)
	}
	async connect(){
		this.mongoClient.connect()
		this.db = this.mongoClient.db(process.env.DB_NAME)
	}

	async getCatalogue(){
		const collection = this.db.collection("catalogue")
		const result = await collection.find({}).toArray()
		return result
	}
	
	async getUser(login, password){
		const collection = this.db.collection("users")
		const result = await collection.findOne({login: login, password: password})
		return result
	}

	async getCart(login){
		const collection = this.db.collection("users")
		const user = await collection.findOne({login: login})
		return user.cart
	}
	async getFavs(login){
		const collection = this.db.collection("users")
		const user = await collection.findOne({login: login})
		return user.favorites??[]
	}
	async getUsers(){
		//const collection = this.db.collection("users")
		//let users = await collection.find({login: "login1"})
		// users = users.map(user=>(
		// 	{login: user.login,
		// 		name: user.name,
		// 		role: user.role}
		// ))
		const collection = this.db.collection("users")
		let users = await collection.find().toArray()
		
		users = users.map(user=>(
			{login: user.login,
				_id: user._id,
				name: user.name,
				role: user.role}
		))
		return users??[]
	}

	async addToCart(userLogin, itemID){
		const collection = this.db.collection("users")
		const objId = ObjectId.createFromHexString(itemID)

		const user = await collection.findOne({login: userLogin})

		let itemFound = false
		user.cart = user.cart.map(item=>{
			if(objId.equals(item._id)){
				itemFound = true
				return {_id: item._id, num: item.num+1}
			}
			return item
		})
		if(!itemFound){
			user.cart.push({_id: objId, num: 1})
		}
		const result = await collection.replaceOne({login: userLogin}, 
			user)
		return result
	}
	async removeOneFromCart(userLogin, itemID){
		
		const collection = this.db.collection("users")
		const objId = ObjectId.createFromHexString(itemID)

		const user = await collection.findOne({login: userLogin})

		user.cart = user.cart.map(item=>{
			if(objId.equals(item._id)){
				return {_id: item._id, num: item.num-1}
			}
			return item
		}).filter(item=>item.num > 0)
		const result = await collection.replaceOne({login: userLogin}, 
			user)
		return result
	}
	async addToFavs(userLogin, itemID){
		const collection = this.db.collection("users")
		const objId = ObjectId.createFromHexString(itemID)

		const user = await collection.findOne({login: userLogin})
		const favs = user.favorites??[]

		let isItemInFavs = false
		favs.forEach(item=>{
			if(objId.equals(item)){
				isItemInFavs = true
			}
		})
		if(!isItemInFavs){
			favs.push(objId)
		}
		user.favorites = favs
		const result = await collection.replaceOne({login: userLogin}, 
			user)
		return result
	}

	async removeFromFavs(userLogin, itemID){
		const collection = this.db.collection("users")
		const objId = ObjectId.createFromHexString(itemID)

		const user = await collection.findOne({login: userLogin})
		const favs = user.favorites??[]
		console.log(favs)
		user.favorites = favs.filter(item=>!objId.equals(item))
		console.log(user.favorites)
		const result = await collection.replaceOne({login: userLogin}, 
			user)
		return result
	}

}
