exports.adminFilter = function(req, res, next){
	const role = req.body.user.role
	console.log(req.body)
	if(role === "admin"){
		next()
		return
	}else{
		res.sendStatus(403)
		return
	}
}