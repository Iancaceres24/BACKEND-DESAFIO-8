import { CartManagerDB } from "../dao/dbManagers/CartManagerDB.js";

const cartManagerDB = new CartManagerDB

class CartController{
    static getCart = async(req,res)=>{
        const carts = await cartManagerDB.getCarts()
        res.send({
            status:"succes",
            carts: carts
        })
    }

    static getCartId = async(req,res)=>{
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
    }

    static createCart = async(req,res)=>{
        const cart = await cartManagerDB.createCart()

        
        res.send({
            status:"succes",
            msg: "Producto creado",
            carritos: cart
    })
    }
    static addCart = async(req,res)=>{
        const cid = req.params.cid
        const pid = req.params.pid
        const stock = req.body.stock
        const cart = await cartManagerDB.addProductsInCart(pid,cid,stock)
        res.send({
            status:"succes",
            msg: cart
        })
    }
}


export default CartController