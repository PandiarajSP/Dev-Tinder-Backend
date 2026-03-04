const mongoose = require("mongoose");
const validate = require("validator");
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 4
        },
        lastName: {
            type: String
        },
        emailId: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            validate(value) {
                if (!validate.isEmail(value))
                    throw new Error("Invalid Email address")
            }
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (!validate.isStrongPassword(value)) {
                    throw new Error("Enter strong password");
                }
            }
        },
        age: {
            type: Number,
            min: 18
        },
        gender: {
            type: String,
            // it only runs for creating new document, 
            // If we need to run this validation while updation, check runValidators in findByIdAndUpdate
            validate(value) {
                if (!["male", "female", "others"].includes(value))
                    throw new Error("Gender data not valid");
            }
        },
        city: {
            type: String
        },
        phoneNumber: {
            type: Number,
            validate(value) {
                if (!validate.isMobilePhone(value)) {
                    throw new Error("Invalid Phone number");
                }
            }
        },
        photoUrl: {
            type: String
        },
        about: {
            type: String,
            default: "This is the sample default about of the user"
        },
        skills: {
            type: [String]
        }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model("User", userSchema);