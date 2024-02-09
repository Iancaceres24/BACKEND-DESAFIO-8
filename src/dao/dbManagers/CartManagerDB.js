import cartsModel from "../models/cart.models.js"
import productModel from "../models/products.models.js"



class CartManagerDB {

    getCarts = async ()=>{
        const carts = await cartsModel.find()
        return carts
    }

    getCartsByID = async (cid)=>{
        const cart = await cartsModel.find({_id:cid})
        return cart
    }
    
    createCart = async () =>{
        const cart = await cartsModel.create({})
        return cart
    }
    addProductsInCart = async (cid, pid, stock = 1) =>{
        const cart = await cartsModel.findOne({_id:cid})
        if (!cart) {
            return {
                status: "error",
                msg: `El carrito con el id ${cid} no existe`
            }
        }
        const product = await productModel.findOne({_pid: pid})
        if (!product) {
            return {
                status: "error",
                msg: `El carrito con el id ${pid} no existe`
            }
    }

    const indexProduct = productsInCart.findIndex((product)=>product.product == pid)
    
    if (indexProduct == -1){
        const newProduct = {
            product: pid,
            stock: stock 
        }
        cart.product.push(newProduct)
    }else{
        cart.product[indexProduct].stock += stock
    }

    
    await cart.save()
    return cart

}
}

export {CartManagerDB}