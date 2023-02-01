const bcrypt = require("bcrypt");

module.exports = {

    getHashedPassword : async(req) => {
        const salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash(req,salt);
        return password;
    }
}