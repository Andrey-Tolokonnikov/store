const MongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId

module.exports = class DAO {
	url
	mongoClient
	db
	constructor(url) {
		this.url = url
		this.mongoClient = new MongoClient(this.url)
	}
	async connect() {
		this.mongoClient.connect()
		this.db = this.mongoClient.db(process.env.DB_NAME)
	}

	async getCatalogue() {
		const collection = this.db.collection("catalogue")
		const result = await collection.find({}).sort({ _id: -1 }).toArray()
		for (let index = 0; index < result.length; index++) {
			const reviews = result[index].reviews
			if (!reviews) {
				continue
			}
			for (let i = 0; i < reviews.length; i++) {
				reviews[i].user = await this.getUserByID(reviews[i].user)
			}
		}
		return result
	}


	async getRecommendations(login) {
		const user = await this.getUserByLogin(login)
		console.log(user)
		if (!user) {
			throw new Error("User not found")
		}
	
		const favCategories = user.favCategories ?? []
		const categoryCounts = favCategories.reduce((acc, category) => {
			acc[category] = (acc[category] || 0) + 1
			return acc
		}, {})
	
		const catalogue = await this.getCatalogue()
		
		const sortCatalogue = (a, b) => {
			const aScore = a.categories.reduce(
				(score, category) => score + (categoryCounts[category] || 0),
				0
			)
			const bScore = b.categories.reduce(
				(score, category) => score + (categoryCounts[category] || 0),
				0
			)
			return bScore - aScore
		}
		//console.log(catalogue)
		console.log(categoryCounts)
		const sortedCatalogue = catalogue.sort(sortCatalogue)
		//console.log(sortedCatalogue)
		return sortedCatalogue.slice(0, 8)
	}
	
	async getItem(itemId, userLogin) {
		console.log("hello")
		const collection = this.db.collection("catalogue")
		const result = await collection.findOne({ _id: ObjectId.createFromHexString(itemId) })
		if (!userLogin) {
			return result // Если пользователь не авторизован, возвращаем только товар
		}
	
		const userCollection = this.db.collection("users")
		const user = await userCollection.findOne({ login: userLogin })
	
		if (!user) {
			return result // Если пользователь не найден, возвращаем только товар
		}
	
		const itemCategories = result.categories || [] // Категории товара
		const maxQueueLength = 10 // Максимальная длина очереди
	
		// Если поле favCategories отсутствует, инициализируем его
		user.favCategories = user.favCategories || []
	
		// Добавляем категории товара в очередь
		user.favCategories.push(...itemCategories)
	
		// Если длина превышает 10, обрезаем лишние элементы
		if (user.favCategories.length > maxQueueLength) {
			user.favCategories = user.favCategories.slice(-maxQueueLength)
		}
	
		// Сохраняем обновленного пользователя в базе
		await userCollection.updateOne(
			{ login: userLogin },
			{ $set: { favCategories: user.favCategories } }
		)
	
		return result
	}

	async updateCatalogue(editedItem) {
		const collection = this.db.collection("catalogue")
		const itemToSend = {
			title: editedItem.title,
			config: editedItem.config,
			price: editedItem.price,
			desc: editedItem.desc,
			categories: editedItem.categories,
		}
		if (editedItem.imgRef != undefined) {
			itemToSend.img = editedItem.imgRef
		}
		const result = await collection.updateOne(
			{ _id: ObjectId.createFromHexString(editedItem._id) },
			{ $set: itemToSend },
		)
		return result
	}

	async addToCatalogue(newItem) {
		const collection = this.db.collection("catalogue")
		const result = await collection.insertOne({
			title: newItem.title,
			config: newItem.config,
			price: newItem.price,
			desc: newItem.desc,
			img: newItem.imgRef,
			categories: newItem.categories,
		})
		return result
	}
	async deleteFromCatalogue(itemID) {
		const id = ObjectId.createFromHexString(itemID)
		const collection = this.db.collection("catalogue")
		const result = await collection.deleteOne({ _id: id })
		return result
	}

	async getUserWithPassword(login) {
		const collection = this.db.collection("users")
		let result = await collection.findOne({ login: login })
		return result
	}

	async getCart(login) {
		const collection = this.db.collection("users")
		const user = await collection.findOne({ login: login })
		return user.cart
	}

	async getFullCartByID(cartWithIDs) {
		const collection = this.db.collection("catalogue")
		for (let i = 0; i < cartWithIDs.length; i++) {
			cartWithIDs[i].item = await collection.findOne({
				_id: cartWithIDs[i]._id,
			})
		}

		return cartWithIDs
	}
	async getFavs(login) {
		const collection = this.db.collection("users")
		const user = await collection.findOne({ login: login })
		return user.favorites ?? []
	}
	async getUsers() {
		const collection = this.db.collection("users")
		let users = await collection.find().toArray()

		users = users.map((user) => ({
			login: user.login,
			_id: user._id,
			name: user.name,
			role: user.role,
			isBlocked: user.isBlocked,
		}))
		return users ?? []
	}
	async getUserByLogin(login) {
		const collection = this.db.collection("users")
		const user = await collection.findOne({ login: login })
		return (
			user && {
				login: user.login,
				_id: user._id,
				name: user.name,
				role: user.role,
				isBlocked: user.isBlocked,
				cart: user.cart,
				favs: user.favorites,
				favCategories: user.favCategories
			}
		)
	}
	async getUserByID(id) {
		const collection = this.db.collection("users")
		const user = await collection.findOne({ _id: id })
		return (
			user && {
				login: user.login,
				_id: user._id,
				name: user.name,
				role: user.role,
				isBlocked: user.isBlocked,
				cart: user.cart,
				favs: user.favorites,
				favCategories: user.favCategories
			}
		)
	}

	async registrate({ name, login, password }) {
		const collection = this.db.collection("users")

		const result = await collection.insertOne({
			name: name,
			login: login,
			password: password,
			role: "user",
			cart: [],
			favs: [],
		})
		return result
	}

	async setUserBlocked(userID, toBlock) {
		const collection = this.db.collection("users")
		const objID = ObjectId.createFromHexString(userID)
		const result = await collection.updateOne(
			{ _id: objID },
			{ $set: { isBlocked: toBlock } },
		)
		return result
	}

	async setUserRole(userID, role) {
		const collection = this.db.collection("users")
		const objID = ObjectId.createFromHexString(userID)
		const result = await collection.updateOne(
			{ _id: objID },
			{ $set: { role: role } },
		)
		return result
	}

	async addToCart(userLogin, itemID) {
		const collection = this.db.collection("users")
		const objId = ObjectId.createFromHexString(itemID)

		const user = await collection.findOne({ login: userLogin })

		let itemFound = false
		user.cart = user.cart.map((item) => {
			if (objId.equals(item._id)) {
				itemFound = true
				return { _id: item._id, num: item.num + 1 }
			}
			return item
		})
		if (!itemFound) {
			user.cart.push({ _id: objId, num: 1 })
		}
		const result = await collection.replaceOne({ login: userLogin }, user)
		return result
	}
	async removeOneFromCart(userLogin, itemID) {
		const collection = this.db.collection("users")
		const objId = ObjectId.createFromHexString(itemID)

		const user = await collection.findOne({ login: userLogin })

		user.cart = user.cart
			.map((item) => {
				if (objId.equals(item._id)) {
					return { _id: item._id, num: item.num - 1 }
				}
				return item
			})
			.filter((item) => item.num > 0)
		const result = await collection.replaceOne({ login: userLogin }, user)
		return result
	}

	async clearCart(login) {
		const collection = this.db.collection("users")

		const user = await collection.findOne({ login: login })

		user.cart = []

		const result = await collection.replaceOne({ login: login }, user)
		return result
	}
	async addToFavs(userLogin, itemID) {
		const collection = this.db.collection("users")
		const objId = ObjectId.createFromHexString(itemID)

		const user = await collection.findOne({ login: userLogin })
		const favs = user.favorites ?? []

		let isItemInFavs = false
		favs.forEach((item) => {
			if (objId.equals(item)) {
				isItemInFavs = true
			}
		})
		if (!isItemInFavs) {
			favs.push(objId)
		}
		user.favorites = favs
		const result = await collection.replaceOne({ login: userLogin }, user)
		return result
	}

	async removeFromFavs(userLogin, itemID) {
		const collection = this.db.collection("users")
		const objId = ObjectId.createFromHexString(itemID)

		const user = await collection.findOne({ login: userLogin })
		const favs = user.favorites ?? []
		user.favorites = favs.filter((item) => !objId.equals(item))
		const result = await collection.replaceOne({ login: userLogin }, user)
		return result
	}

	async getOrders() {
		const collection = this.db.collection("orders")
		const orders = collection.find({}).toArray()
		return orders
	}

	async getOrdersForLogin(login) {
		const collection = this.db.collection("orders")

		const userID = (await this.getUserByLogin(login))._id

		const orders = collection.find({ user: userID }).toArray()
		return orders
	}

	async addOrder(cart, userID, date) {
		const collection = this.db.collection("orders")

		const result = await collection.insertOne({
			cart: cart.map((item) => ({
				_id: ObjectId.createFromHexString(item._id),
				num: item.num,
			})),
			user: ObjectId.createFromHexString(userID),
			date: date,
			status: 0,
		})
		return result
	}

	async setOrderStatus(orderID, status) {
		const collection = this.db.collection("orders")
		const id = ObjectId.createFromHexString(orderID)
		const result = await collection.updateOne(
			{ _id: id },
			{ $set: { status: status } },
		)
		return result
	}
}
