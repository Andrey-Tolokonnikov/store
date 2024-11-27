exports.roleFilter = function(role){
	return function(req, res, next){
		const reqRole = req.body.user.role
		if(role === reqRole){
			next()
			return
		}else{
			res.sendStatus(403)
			return
		}
	}}