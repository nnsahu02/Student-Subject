const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes')

const app = express()
app.use(express.json())


mongoose.set('strictQuery', false)

mongoose.connect("mongodb+srv://nnsahu2022:Sahurk012@mycluster.ne522qz.mongodb.net/student", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err))


app.use('/', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Express app is running on PORT ${PORT}.`)
})

