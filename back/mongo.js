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
		this.db = this.mongoClient.db("store")
	}

	async getCatalogue(){
		const collection = this.db.collection("catalogue")
		const result = await collection.find({}).toArray()
		return result
	}
	async getUser(login, password){
		const collection = this.db.collection("users")
		const result = await collection.find({login: login, password: password}).toArray()
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
}

// exports.getCatalogue = async function getCatalogue() {
// 	try {
// 		// Подключаемся к серверу
// 		await mongoClient.connect()
// 		// обращаемся к базе данных admin
// 		const db = mongoClient.db("store")
// 		const collection = db.collection("catalogue")
// 		// выполняем пинг для проверки подключения
// 		const result = await collection.find({}).toArray()
// 		return result
// 	}catch(err) {
// 		console.log("Возникла ошибка")
// 		console.log(err)
// 	} finally {
// 		// Закрываем подключение при завершении работы или при ошибке
// 		await mongoClient.close()
// 		console.log("Подключение закрыто")
// 	}
// }

// exports.getUser = async function getUser(login, password){
// 	try {
// 		await mongoClient.connect()

// 		const db = mongoClient.db("store")
// 		const collection = db.collection("users")

// 		const result = await collection.find({login: login, password: password}).toArray()
// 		return result
// 	}catch(err) {
// 		console.log("Возникла ошибка")
// 		console.log(err)
// 	} finally {
// 		// Закрываем подключение при завершении работы или при ошибке
// 		await mongoClient.close()
// 		console.log("Подключение закрыто")
// 	}
// }

// exports.addToCart = async function addToCart(userLogin, itemID){
// 	try {

// 		await mongoClient.connect()

// 		const db = mongoClient.db("store")
// 		const collection = db.collection("users")
// 		const objId = ObjectId.createFromHexString(itemID)

// 		const user = await collection.findOne({login: userLogin})

// 		let itemFound = false
// 		user.cart = user.cart.map(item=>{
// 			if(objId.equals(item._id)){
// 				itemFound = true
// 				return {_id: item._id, num: item.num+1}
// 			}
// 			return item
// 		})
// 		if(!itemFound){
// 			user.cart.push({_id: objId, num: 1})
// 		}
// 		const result = await collection.replaceOne({login: userLogin}, 
// 			user)
// 		return result
// 	}catch(err) {
// 		console.log(err)
// 	} finally {
// 		// Закрываем подключение при завершении работы или при ошибке
// 		await mongoClient.close()
// 		console.log("Подключение закрыто")
// 	}
// }