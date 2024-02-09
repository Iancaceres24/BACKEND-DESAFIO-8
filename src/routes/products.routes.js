import {Router} from "express"
import ProductController from "../controlador/products.contorler.js"
const router = Router() 


router.get("/",ProductController.getProductsController)

router.get("/:pid",ProductController.getProductId)

router.post("/",ProductController.createProduct)
    
router.put("/:pid",ProductController.updateProduct)

router.delete("/:pid",ProductController.delateProduct)

export {router as productsRouter}