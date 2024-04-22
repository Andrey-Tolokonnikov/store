const jwt = require("jsonwebtoken")

exports.authFilter = function(req, res, next){
	if(["/catalogue", "/auth"].includes(req.path)){
		next()
		return
	}
	const token = req.cookies[process.env.TOKEN_NAME]
	try{
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
		req.body.user = decoded
		
	} catch(err){
		res.sendStatus(401)
		return
	}
	next()
}