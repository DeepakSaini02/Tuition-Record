const { Schema, model } = require('mongoose')

const studentSchema = new Schema({

    name: { type: String, required: true },
    grade: { type: Number, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    test_id: [{
        type: Schema.Types.ObjectId,
        ref: "test",
        required: true
    }]

}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('student', studentSchema)