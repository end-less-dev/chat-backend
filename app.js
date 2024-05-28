const express = require("express")
const messageRouter = require("./routes/message")
const userRouter = require("./routes/user")
const cros = require("cors")

const app = express()
app.use(cros({
    origin : "*"
}))

app.use(express.json())

app.use("/user", userRouter)
app.use("/message", messageRouter)

module.exports = app