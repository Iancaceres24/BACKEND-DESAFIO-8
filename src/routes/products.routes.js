import {Router} from "express"
import ProductManagerDB from "../dao/dbManagers/ProductManagerDB.js"

const router = Router() 
const productManagerDB = new ProductManagerDB()

router.get("/", async(req,res)=>{

    try {
        const{limit,page,sort,category,price} = req.query
        const options =  {
            limit: limit ?? 10,
            page: page ?? 1,
            sort: {price: sort == "asc"? 1: -1},
            lean: true   
        }
        const productos = await productManagerDB.getProducts(options)

        if(productos.hasPrevPage){
            productos.prevLink = "---LINK---"}
        if(productos.hasNextPage){
                productos.nextLink = "---LINK---"
            }
        res.send({
            status:"succes",
            productos: productos    
        })
        
    } catch (error) {
        console.log(error)
    }   

})

router.get("/:pid", async (req, res) => {
    const pid =  req.params.pid;
    const producto  = await productManagerDB.getProductByID(pid) 
    res.send(producto)
})

    

router.post("/", async(req,res)=>{
    const {title,description,code,price,stock,category} = req.body
    
    if(!title||!description||!code||!price||!stock||!category){
        res.send({
            status:"error",
            msg: "Faltan campos"
        })
    }
    const product = {
        title, description,code,price,stock,category
    }
    const producto = await productManagerDB.createProduct(product)
    res.send({
        status:"succes",
        msg: "Producto creado",
        productos: producto
    })}
)

router.put("/:pid", async(req,res)=>{
    const pid = req.params.pid
    const {title,description,code,price,stock,category} = req.body
    const update = {
        title,description,code,price,stock,category
    }
    const producto = productManagerDB.updateProduct(pid,update)
    res.send({
        status: "succes",
        msg: "Producto actualizado",
        producto: producto
    })    
})

router.delete("/:pid", async (req, res) => {
        const pid = req.params.pid
        const producto = productManagerDB.deleteProduct(pid)

        res.send({
            status: "success",
            eliminada: `Producto eliminado`,
            }
        );
    
})

export {router as productsRouter}