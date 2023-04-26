const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            minLength: 2,
            maxLength: 15,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            minLength: 7,
            maxLEngth: 50,
            required: true
        },
        role: {
            type: String,
            default: "user"
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("user", userSchema);