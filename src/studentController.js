const studentModel = require('./studentModel')


const createStudent = async (req, res) => {
    try {
        const bodyData = req.body
        const { name, subject, mark } = bodyData

        if (!name) return res.status(400).send({ status: false, message: "name is requires." })
        if (!subject) return res.status(400).send({ status: false, message: "subject is requires." })
        if (!mark) return res.status(400).send({ status: false, message: "mark is requires." })

        const studentData = await studentModel.findOne({ name: name, subject: subject, isDeleted: false })

        if (studentData) {
            const update = await studentModel.findOneAndUpdate(
                { name: name, subject: subject },
                { mark: studentData.mark + mark },
                { new: true })
            data = {
                name: name,
                subject: subject,
                mark: update.mark
            }

            return res.status(200).send({
                status: true,
                message: `Mark added successfully, ${name} has ${data.mark} marks in ${subject}.`,
                data: data
            })
        } else {
            await studentModel.create(bodyData)

            return res.status(201).send({
                status: true,
                message: `Students data created Successfully, ${name} has ${mark} marks in ${subject}.`,
                data: bodyData
            })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const getStudent = async (req, res) => {
    try {
        const queryData = req.query
        const { name, subject } = queryData

        const filter = { isDeleted: false }

        if (name) {
            filter.name = name
        }
        if (subject) {
            filter.subject = subject
        }

        const data = await studentModel.find(filter).select({ _id: 0, __v: 0, isDeleted: 0 })
        if (!data) {
            return res.status(404).send({ status: false, message: "No data found with this filter" })
        }

        return res.status(200).send({
            status: true,
            message: `The data with this filter are as follows.`,
            data: data
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const deleteStudent = async (req, res) => {
    try {
        const name = req.params.name
        const subject = req.params.subject

        const deleteData = await studentModel.findOneAndUpdate(
            { name: name, subject: subject, isDeleted: false },
            { isDeleted: true },
            { new: true }
        )
        if (!deleteData) {
            return res.status(400).send({
                status: false,
                message: `The student data is already deleted or no student found with name ${name} with subject ${subject}.`
            })
        }

        return res.status(200).send({
            status: true,
            message: `The student data Deleted successfully.`,
            data: deleteData
        })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createStudent, getStudent, deleteStudent }