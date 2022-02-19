const express = require('express')
const router = express.Router()
const Test = require('../model/test.model')

router.post('/', async (req, res) => {
    try {

        const test = await Test.create(req.body)
        return res.status(201).json(test)

    } catch (err) {
        return res.status(500).json({ "status": false, "message": "try again" })
    }
})

router.get('/', async (req, res) => {
    try {

        const test = await Test.find().lean().exec()
        return res.status(200).json(test)

    } catch (err) {
        return res.status(500).json({ "status": false, "message": "try again" })
    }
})



module.exports = router