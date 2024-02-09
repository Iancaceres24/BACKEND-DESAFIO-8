import {Router} from "express"
import CartController from "../controlador/cart.controler.js";


const router = Router() 

router.get("/",CartController.getCart)


router.get("/:cid",CartController.getCartId)

router.post("/",CartController.createCart)

router.post("/:cid/products /:pid", CartController.addCart)



export {router as cartRouter}