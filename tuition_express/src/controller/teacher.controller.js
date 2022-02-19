const express = require('express')

const router = express.Router()
const Teacher = require('../model/teacher.model')


router.post('/', async (req, res) => {

    try {
        const teacher = await Teacher.findOne({ email: req.body.email, password: req.body.password })
        if (!teacher)
            return res.status(400).json({ status: false, "error": "Invalid Id or Password" })

        return res.status(500).json({ status: true })
    } catch (err) {
        res.status(500).json({ status: false, "error": "Try Again" })
    }
})

module.exports = router