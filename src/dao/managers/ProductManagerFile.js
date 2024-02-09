import fs from "fs"
import path from "path"
import __dirname from "../../utils.js"

class ProductManagerFile {
    constructor(pathFile){
        this.path = path.join(__dirname,`/files/${pathFile}`)
    }


getProducts = async () => {
    if(fs.existsSync(this.path)){
        const data = await fs.promises.readFile(this.path,"utf-8")
        const productos = JSON.parse(data)
        return productos
    }else{
        return []
    }
}
crearProducto = async (producto) =>{
    const productos = await this.getProducts()
    if(!producto.title||!producto.description||!producto.code||!producto.price||!producto.stock||!producto.category)
    {return "Faltan Campos"}else{
    if(productos.length === 0){
        producto.id = 1
        }
        else{
            producto.id = productos[productos.length-1].id + 1
            
        } 
        producto.status = true
        producto.thumbnails = []

        productos.push(producto)
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"))
        return productos
}
}

updateProduct = async (id, update) => {
        
            const products = await this.getProducts();
            const buscarId = products.find(producto => producto.id == id);
    
            if (buscarId) {
                const updatedProduct = { ...buscarId, ...update };
    
            updatedProduct.id = id;
    
            const updatedProducts = products.map(product => (product.id == id ? updatedProduct : product));
    
            await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, "\t"));
    
                return updatedProduct;
            } else {
                console.log(`No se encontró un producto con el ID ${id}`);
                return null;
            }
        
    };
    
      updateProductList= async(newProductList)=>{
        await fs.promises.writeFile(this.path, JSON.stringify(newProductList, null, "\t"));}

}

export {ProductManagerFile}