import {Router} from "express"
import ProductManagerDB from "../dao/dbManagers/ProductManagerDB.js"
import productModel from "../dao/models/products.models.js"

const router = Router()

router.get("/", async(req,res)=>{
        
    res.render("login")
})

router.get("/register", (req,res)=>{
    res.render("register")
})

     router.get("/products", async(req,res)=>{
     const products = await productModel.find().lean()
     res.render("products",{products, user:req.session.user})
 })

router.get("/carts",async(req,res)=>{
    req
    res.render("carts")
})

router.get("/resetPassword",(req,res)=>{
    res.render("resetPassword")
})

export {router as viewRouter}