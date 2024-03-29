import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity:{
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
}) 

cartSchema.pre("find",function(){
    this.populate("products.product")
})

const cartsModel = mongoose.model("cart", cartSchema)

export default cartsModel