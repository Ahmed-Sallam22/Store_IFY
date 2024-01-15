import mongoose, { model, Schema, Types } from 'mongoose';


const productSchema=new Schema({
    name:{
        type:String,
        required: [true, "Name is required"],
        trim:true,
        lowercase:true
    },
    slug:{
        type:String,
        required: [true, "Name is required"],
        trim:true,
    },
    description:{
        type:String,
    },
    stock:{type:Number ,default:1},
    priceBeforeDiscount:{type:Number ,default:1 },
    discount:{type:Number , default:0},
    priceAfterDiscount:{type:Number ,default:1 },
    colors:[String],
    size:{
        type:[String],
        enum:['xs','s','m','L','xL','2xL','3xL','4xL']
    },
    weight:{type:Number ,default:1},
    mainImage:{type:Object, required:true},
    subImage:{type:[Object]},
    categoryId:{ type: Types.ObjectId, ref: 'Category', required: true },
    BrandId:{ type: Types.ObjectId, ref: 'Brand', required: true },
    subcategoryId:{ type: Types.ObjectId, ref: 'SubCategory', required: true },
    
    

},{
    timestamps: true
})


const productModel=mongoose.models.branch ||  model('product',productSchema)

export default productModel