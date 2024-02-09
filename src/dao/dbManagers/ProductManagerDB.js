import productModel from "../models/products.models.js"

class ProductManagerDB {
    

    getProducts = async (options)=>{

        const products = await productModel.paginate(
            {
                
            },
            {
                options
            }
        )
            return products 
    }

    getProductByID = async (pid) => {
            const product = await productModel.findOne({ _id: pid });
    
            if (!product) {
                return {
                    status: "error",
                    msg: "Producto no encontrado"
                };
            }
    
            return {
                status: "success",
                msg: product
            };
        
    };
    createProduct = async (product) =>{
        
        const producto = await productModel.create(product)
        return {
            status: "succes",
            msg: producto
        }
    }

    deleteProduct = async(pid) =>{
        const producto = await productModel.deleteOne({_id:pid})
        return producto
            
        }

    updateProduct = async(pid,update)=>{
        
        const producto = await productModel.updateOne({_id:pid},{$set:update})
        return producto
    }

    }
export default ProductManagerDB