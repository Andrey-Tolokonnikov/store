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
		const result = await collection.find({}).sort({_id: -1}).toArray()
		return result
	}

	async updateCatalogue(editedItem){
		const collection = this.db.collection("catalogue")
		const itemToSend = {title: editedItem.title,
			config: editedItem.config,
			price: editedItem.price,
			desc: editedItem.desc}
		if(editedItem.imgRef != undefined){
			itemToSend.img = editedItem.imgRef
		}
		const result = await collection.updateOne(
			{_id: ObjectId.createFromHexString(editedItem._id)},
			{$set: itemToSend})
		return result
	}

	async addToCatalogue(newItem){
		const collection = this.db.collection("catalogue")
		const result = await collection.insertOne({ 
			title: newItem.title,
			config: newItem.config,
			price: newItem.price,
			desc: newItem.desc,
			img: newItem.imgRef
		})
		return result
	}
	async deleteFromCatalogue(itemID){
		const id = ObjectId.createFromHexString(itemID)
		const collection = this.db.collection("catalogue")
		const result = await collection.deleteOne({_id: id})
		return result
	}
	
	async getUserWithPassword(login){
		const collection = this.db.collection("users")
		let result = await collection.findOne({login: login})
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
		const collection = this.db.collection("users")
		let users = await collection.find().toArray()
		
		users = users.map(user=>(
			{login: user.login,
				_id: user._id,
				name: user.name,
				role: user.role,
				isBlocked: user.isBlocked}
		))
		return users??[]
	}
	async getUserByLogin(login){
		const collection = this.db.collection("users")
		const user = await collection.findOne({login: login})
		return user && (
			{login: user.login,
				_id: user._id,
				name: user.name,
				role: user.role,
				isBlocked: user.isBlocked,
				cart: user.cart,
				favs: user.favorites}
		)
	}

	async registrate({name, login, password}){
		const collection = this.db.collection("users")
		
		const result = await collection.insertOne({name: name, 
			login: login, 
			password: password,
			role: "user",
			cart: [],
			favs: []})
		return result
	}

	async setUserBlocked(userID, toBlock){
		const collection = this.db.collection("users")
		const objID = ObjectId.createFromHexString(userID)
		const result = await collection.updateOne({_id: objID}, {$set: {isBlocked: toBlock}})
		return result
	}

	async setUserRole(userID, role){
		const collection = this.db.collection("users")
		const objID = ObjectId.createFromHexString(userID)
		const result = await collection.updateOne({_id: objID}, {$set: {role: role}})
		return result
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
		user.favorites = favs.filter(item=>!objId.equals(item))
		const result = await collection.replaceOne({login: userLogin}, 
			user)
		return result
	}

}
