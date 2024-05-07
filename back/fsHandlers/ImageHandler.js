const fs = require("fs")
 
function generateName(){
	return Date.now()
}

function getExtension(char){
	switch(char){
	case "i":
		return ".png"
	case "/":
		return ".jpg"
	}
}
exports.saveImageFromBase64 = function (base64){
	base64 = base64.replace(/^data:image\/jpeg;base64,/,"").replace(/^data:image\/png;base64,/, "")
	const firstChar = base64.slice(0, 1)

	const name = generateName() + getExtension(firstChar)
    
	fs.writeFile(process.env.PUBLIC_DIR +"/"+ name, base64, "base64", function() {
	})

	return name
} 