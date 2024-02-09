import {Router} from "express"
import {CartManagerDB} from "../dao/dbManagers/CartManagerDB.js"

const path = "carts.json"
const router = Router() 
const cartManagerDB = new CartManagerDB(path)

router.get("/", async(req,res)=>{
    const carts = await cartManagerDB.getCarts()
    res.send({
        status:"succes",
        carts: carts
    })
})

router.get("/:cid", async (req, res) => {
    const carts = await cartManagerDB.getCartsByID()
    const cid = req.params.cid;
    const carri = carts.find(car =>{return car.id == cid})

    if (!carri) {
        return res.json({
            error: "Producto no encontrado"
        });
    } else {
        res.json({
            Carrito: carri
        });
    }
});

router.post("/", async(req,res)=>{
    // const cart = req.body
    // const products = req.body.products
    // const carts = await cartManagerFile.crearCarts(cart,products)
    const cart = await cartManagerDB.createCart()

        
    res.send({
        status:"succes",
        msg: "Producto creado",
        carritos: cart
    })
})
router.post("/:cid/products /:pid", async(req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const stock = req.body.stock
    const cart = await cartManagerDB.addProductsInCart(pid,cid,stock)
    res.send({
        status:"succes",
        msg: cart
    })
})



export {router as cartRouter}