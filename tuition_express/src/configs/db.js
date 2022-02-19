const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.ATLAS_URI
const connect = () => {
    return mongoose.connect(uri)
}

module.exports = connect