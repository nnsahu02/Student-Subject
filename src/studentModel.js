const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    mark: {
        type: Number,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("student", studentSchema)