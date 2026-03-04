const validator  = require("validator");
const validateSignup = (req) => {
    const { firstName, lastName, emailId, password } = req;

    if (!firstName || !lastName)
        throw new Error("Name should not be empty")
    if(firstName.length < 4 || firstName > 50) 
        throw new Error("Firstname should be within a 4 - 50 characters");
    if(!validator.isEmail(emailId))
        throw new Error("Invalid Email")
    if(!validator.isStrongPassword(password))
        throw new Error("Not a strong password")
}

module.exports = {validateSignup}