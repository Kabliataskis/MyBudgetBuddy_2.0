const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            maxLength: 20,
            trim: true,
            required: true,
            unique: true
        },
        imgSrc: {
            type: String,
            default: "favicon.ico"
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("category", categorySchema);