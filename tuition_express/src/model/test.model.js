const { Schema, model } = require('mongoose')

const testSchema = new Schema({


    name: { type: String, required: true },
    subject: { type: String, required: true },
    marks: { type: Number, required: true },
    date: { type: String, required: true },

}, {
    versionKey: false,
    timestamps: true
})


module.exports = model('test', testSchema)