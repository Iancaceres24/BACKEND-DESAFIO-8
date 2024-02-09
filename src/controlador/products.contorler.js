import ProductManagerDB from "../dao/dbManagers/ProductManagerDB.js";
const productManagerDB = new ProductManagerDB();

class ProductController {
  static getProductsController = async (req, res) => {
    const productos = await productManagerDB.getProducts();
    res.send({
      status: "succes",
      productos: productos,
    });
  };
  static getProductId = async (req, res) => {
    const pid = req.params.pid;
    const producto = await productManagerDB.getProductByID(pid);
    res.send(producto);
  };

  static createProduct = async (req, res) => {
    const { title, description, code, price, stock, category } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      res.send({
        status: "error",
        msg: "Faltan campos",
      });
    }
    const product = {
      title,
      description,
      code,
      price,
      stock,
      category,
    };
    const producto = await productManagerDB.createProduct(product);
    res.send({
      status: "succes",
      msg: "Producto creado",
      productos: producto,
    });
  };

  static updateProduct = async (req,res) =>{
    const pid = req.params.pid
    const {title,description,code,price,stock,category} = req.body
    const update = {
        title,description,code,price,stock,category
    }
    const producto = productManagerDB.updateProduct(pid,update)
    res.send({
        status: "succes",
        msg: "Producto actualizado",
        producto: pid
    }) 
  }

  static delateProduct = async (req,res) =>{
    const pid = req.params.pid
        const producto = productManagerDB.deleteProduct(pid)

        res.send({
            status: "success",
            eliminada: `Producto eliminado`,
            }
        );
    
  }


}

export default ProductController;
