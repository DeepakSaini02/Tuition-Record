const express = require('express')
const router = express.Router()
const Student = require('../model/student.model')


router.post('/', async (req, res) => {
    try {

        const student = await Student.create(req.body)
        return res.status(201).json(student)

    } catch (err) {
        return res.status(500).json({ "status": false, "message": "try again" })
    }
})

router.get('', async (req, res) => {
    try {

        const page = +req.query.page || 1
        const size = +req.query.size || 3

        const skip = (page - 1) * size;
        const gradeArr = req.query.grade.split("to")

        if (req.query.search) {
            // console.log('hell', req.query.search);

            var student = await Student.find({ name: { $regex: `${req.query.search}`, $options: 'i' } }).populate("test_id").skip(skip).limit(size).lean().exec()
            var totalPages = Math.ceil((await Student.find().countDocuments({ name: { $regex: `${req.query.search}`, $options: 'i' } })) / size)
            return res.status(200).send({ student, totalPages })

        }
        else if (req.query.gender) {
            var student = await Student.find({ gender: req.query.gender }).populate("test_id").skip(skip).limit(size).lean().exec()
            var totalPages = Math.ceil((await Student.find().countDocuments({ gender: req.query.gender })) / size)
            return res.status(200).send({ student, totalPages })
        }
        else if (gradeArr.length == 2) {
            // console.log(gradeArr);
            var student = await Student.find({ grade: { $gte: +gradeArr[0], $lte: +gradeArr[1] } }).populate("test_id").skip(skip).limit(size).lean().exec()
            var totalPages = Math.ceil((await Student.find().countDocuments({ grade: { $gte: +gradeArr[0], $lte: +gradeArr[1] } })) / size)
            return res.status(200).send({ student, totalPages })
        }

        else if (req.query.sort != 0)
            var student = await Student.find().sort({ age: -1 }).populate("test_id").skip(skip).limit(size).lean().exec()
        else
            var student = await Student.find().populate("test_id").skip(skip).limit(size)

        var totalPages = Math.ceil((await Student.find().countDocuments()) / size)


        return res.status(200).send({ student, totalPages })


    } catch (err) {
        return res.status(500).json({ "status": false, "message": "try again" })
    }
})

router.get("/:studentId", async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId).populate('test_id').lean().exec()
        res.status(200).send({ student })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})


module.exports = router