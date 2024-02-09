import express  from "express"
import mongoose from "mongoose"
import {engine} from "express-handlebars"
import  MongoStore from "connect-mongo"
import session from "express-session"
import passport from "passport"

import __dirname from "./utils.js"
import { cartRouter } from "./routes/carts.routes.js"
import { productsRouter } from "./routes/products.routes.js"
import {viewRouter} from "./routes/view.routes.js"
import sessionRouter from "./routes/sessions.routes.js"
import inicializePassport from "./config/passport.config.js"

const MONGO = "mongodb+srv://iancaceres:familia123@backend.atwvpnx.mongodb.net/DESAFIO-7"
const connection = mongoose.connect(MONGO)

const PORT = 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname +"/public"))

app.listen(PORT,()=>{
    console.log(`El servidor funciona en el puerto ${PORT}`)
})

app.engine("handlebars",engine())
app.set("view engine", "handlebars")
app.set("views",__dirname + "/views")


app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl:3600
    }),
    secret: "familia123",
    resave: false,
    saveUninitialized: false
}))


app.use("/api/products",productsRouter)
app.use("/api/carts",cartRouter)
app.use("/",viewRouter)
app.use("/api/sessions", sessionRouter)
inicializePassport()
app.use(passport.initialize())
app.use(passport.session())
