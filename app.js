const Express = require("express")
const Mongoose = require("mongoose")
const Bcrypt = require("bcrypt")
const Cors = require("cors")
const jwt = require("jsonwebtoken")
const userModel = require("./models/users")

let app = Express()

app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb+srv://sumedha:sumu123@cluster0.jv4x88s.mongodb.net/blogAppdb")

app.post("/signup", async (req, res) => {

    let input = req.body
    let hashedPassword = Bcrypt.hashSync(req.body.password, 10)
    console.log(hashedPassword)
    req.body.password = hashedPassword

    userModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {

                res.json({ "status": "Email ID already exist." })

            } else {

                let result = new userModel(input)
                result.save()
                // res.json({ "status": "success." })

            }
        }

    ).catch(
        (error) => { }
    )


    //if (check.length > 0) {

    //    res.json({ "status": "Email ID already exist." })

    // } else {

    //  let result = new userModel(input)
    //  await result.save()
    // res.json({ "status": "success." })

    // }


})

app.listen(3030, () => {
    console.log("Server started")
})