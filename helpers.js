//dependencies
const bcrypt = require('bcrypt')

//container for all the helpers
var helpers = {}


//create a SHA256 hash
helpers.hash=(str)=>{
    console.log("str_______++", str)
    if(typeof str == "string" && str.length>0)
    {
        console.log("str____0___++")
        const saltRounds = 12;
        const hash = bcrypt.hashSync(str,saltRounds);
        console.log("hash________++", hash);
        return hash
    }
    else{
        console.log("str____1___++")
        return false;
    }
};

helpers.compareHash = (str, hash) => {
    if (typeof str == "string" && str.length > 0) {
      const result = bcrypt.compare(str, hash);
      return result;
    } else {
      return false;
    }
  }


//Export the module
module.exports = helpers